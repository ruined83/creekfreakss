import { SandboxProvider } from './types';
import { SandboxFactory } from './factory';

interface SandboxInfo {
  sandboxId: string;
  provider: SandboxProvider;
  createdAt: Date;
  lastAccessed: Date;
}

class SandboxManager {
  private sandboxes: Map<string, SandboxInfo> = new Map();
  private activeSandboxId: string | null = null;

  /**
   * Get or create a sandbox provider for the given sandbox ID
   */
  async getOrCreateProvider(sandboxId: string): Promise<SandboxProvider> {
    // Check if we already have this sandbox
    const existing = this.sandboxes.get(sandboxId);
    if (existing) {
      existing.lastAccessed = new Date();
      return existing.provider;
    }

    // Try to reconnect to existing sandbox

    try {
      const provider = SandboxFactory.create();

      // For E2B provider, try to reconnect
      if (provider.constructor.name === 'E2BProvider') {
        try {
          // E2B sandboxes can be reconnected using the sandbox ID
          const reconnected = await (provider as any).reconnect(sandboxId);
          if (reconnected) {
            console.log(`[SandboxManager] Successfully reconnected to E2B sandbox ${sandboxId}`);
            this.sandboxes.set(sandboxId, {
              sandboxId,
              provider,
              createdAt: new Date(),
              lastAccessed: new Date()
            });
            this.activeSandboxId = sandboxId;
            return provider;
          }
        } catch (reconnectError: any) {
          // Check if this is a "Sandbox not found" error
          const errorMessage = reconnectError?.message || String(reconnectError);
          if (errorMessage.toLowerCase().includes('sandbox not found') ||
            errorMessage.toLowerCase().includes('not found')) {
            console.warn(`[SandboxManager] Sandbox ${sandboxId} not found (likely expired). Cleaning up stale reference.`);

            // Clean up the stale sandbox reference
            this.cleanupStaleSandbox(sandboxId);

            // Return a new provider for the caller to set up
            console.log(`[SandboxManager] Returning new provider for sandbox recreation`);
            return SandboxFactory.create();
          }

          // If it's a different error, rethrow it
          throw reconnectError;
        }
      }

      // For Vercel or if reconnection failed, return the new provider
      // The caller will need to handle creating a new sandbox
      return provider;
    } catch (error) {
      console.error(`[SandboxManager] Error reconnecting to sandbox ${sandboxId}:`, error);
      throw error;
    }
  }

  /**
   * Clean up a stale sandbox reference without attempting to terminate it
   */
  private cleanupStaleSandbox(sandboxId: string): void {
    console.log(`[SandboxManager] Cleaning up stale sandbox reference: ${sandboxId}`);
    this.sandboxes.delete(sandboxId);

    if (this.activeSandboxId === sandboxId) {
      this.activeSandboxId = null;
      console.log(`[SandboxManager] Cleared active sandbox ID`);
    }
  }

  /**
   * Register a new sandbox
   */
  registerSandbox(sandboxId: string, provider: SandboxProvider): void {
    this.sandboxes.set(sandboxId, {
      sandboxId,
      provider,
      createdAt: new Date(),
      lastAccessed: new Date()
    });
    this.activeSandboxId = sandboxId;
  }

  /**
   * Get the active sandbox provider
   */
  getActiveProvider(): SandboxProvider | null {
    if (!this.activeSandboxId) {
      return null;
    }

    const sandbox = this.sandboxes.get(this.activeSandboxId);
    if (sandbox) {
      sandbox.lastAccessed = new Date();
      return sandbox.provider;
    }

    return null;
  }

  /**
   * Get a specific sandbox provider
   */
  getProvider(sandboxId: string): SandboxProvider | null {
    const sandbox = this.sandboxes.get(sandboxId);
    if (sandbox) {
      sandbox.lastAccessed = new Date();
      return sandbox.provider;
    }
    return null;
  }

  /**
   * Set the active sandbox
   */
  setActiveSandbox(sandboxId: string): boolean {
    if (this.sandboxes.has(sandboxId)) {
      this.activeSandboxId = sandboxId;
      return true;
    }
    return false;
  }

  /**
   * Terminate a sandbox
   */
  async terminateSandbox(sandboxId: string): Promise<void> {
    const sandbox = this.sandboxes.get(sandboxId);
    if (sandbox) {
      try {
        await sandbox.provider.terminate();
      } catch (error) {
        console.error(`[SandboxManager] Error terminating sandbox ${sandboxId}:`, error);
      }
      this.sandboxes.delete(sandboxId);

      if (this.activeSandboxId === sandboxId) {
        this.activeSandboxId = null;
      }
    }
  }

  /**
   * Terminate all sandboxes
   */
  async terminateAll(): Promise<void> {
    const promises = Array.from(this.sandboxes.values()).map(sandbox =>
      sandbox.provider.terminate().catch(err =>
        console.error(`[SandboxManager] Error terminating sandbox ${sandbox.sandboxId}:`, err)
      )
    );

    await Promise.all(promises);
    this.sandboxes.clear();
    this.activeSandboxId = null;
  }

  /**
   * Clean up old sandboxes (older than maxAge milliseconds)
   */
  async cleanup(maxAge: number = 3600000): Promise<void> {
    const now = new Date();
    const toDelete: string[] = [];

    for (const [id, info] of this.sandboxes.entries()) {
      const age = now.getTime() - info.lastAccessed.getTime();
      if (age > maxAge) {
        toDelete.push(id);
      }
    }

    for (const id of toDelete) {
      await this.terminateSandbox(id);
    }
  }
}

// Export singleton instance
export const sandboxManager = new SandboxManager();

// Also maintain backward compatibility with global state
declare global {
  var sandboxManager: SandboxManager;
}

// Ensure the global reference points to our singleton
global.sandboxManager = sandboxManager;