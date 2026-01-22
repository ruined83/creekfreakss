import { NextRequest, NextResponse } from 'next/server';
import { SandboxProvider } from '@/lib/sandbox/types';
import { sandboxManager } from '@/lib/sandbox/sandbox-manager';

// Get active sandbox provider from global state
declare global {
  var activeSandboxProvider: any;
}

export async function POST(request: NextRequest) {
  try {
    const { command } = await request.json();

    if (!command) {
      return NextResponse.json({
        success: false,
        error: 'Command is required'
      }, { status: 400 });
    }

    // Get provider from sandbox manager or global state
    const provider = sandboxManager.getActiveProvider() || global.activeSandboxProvider;

    if (!provider) {
      return NextResponse.json({
        success: false,
        error: 'No active sandbox'
      }, { status: 400 });
    }

    console.log(`[run-command-v2] Executing: ${command}`);

    const result = await provider.runCommand(command);

    return NextResponse.json({
      success: result.success,
      output: result.stdout,
      error: result.stderr,
      exitCode: result.exitCode,
      message: result.success ? 'Command executed successfully' : 'Command failed'
    });

  } catch (error: any) {
    const errorMessage = error?.message || String(error);
    const isSandboxNotFound = errorMessage.toLowerCase().includes('sandbox not found') ||
      errorMessage.toLowerCase().includes('not found');

    console.error('[run-command-v2] Error:', error);

    return NextResponse.json({
      success: false,
      error: isSandboxNotFound
        ? 'The sandbox has expired or was deleted. Please refresh the page to create a new sandbox.'
        : errorMessage
    }, { status: isSandboxNotFound ? 410 : 500 });
  }
}