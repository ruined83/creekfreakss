import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

import { BookOpen } from "lucide-react";

const Story = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="relative py-16 mb-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="absolute top-10 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-primary font-medium text-sm uppercase tracking-wider">
                  My Journey
                </span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                The Mirror <span className="text-primary">Cracks</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                A memoir in chapters
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <article className="prose prose-lg max-w-none">

              {/* Prologue */}
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 mb-12">
                <h2 className="font-serif text-3xl font-bold mb-6 text-foreground">Prologue</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  I was 38 when the mirror cracked back. Up till then, I had spent my life being everybody else’s last dock plank, the one they stepped off before sailing into better water. I handed them the map, the boots, the breath of courage, then watched the tide take them while I stayed on shore hammering nails into my own feet so I couldn’t follow. Turns out the only person who kept me off the boat was the guy holding the hammer.
                </p>
              </div>

              {/* Chapter 1 */}
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 mb-12">
                <h2 className="font-serif text-3xl font-bold mb-6 text-foreground">Chapter 1: Fragments of Early Days</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Looking back, those first memories are scattered yet vivid, tender and strange. They hold pieces of who I was and who I was becoming. Each moment, whether filled with soot, whispers of danger, or the sweet simplicity of naming a kitten, was shaping me. These fleeting fragments of the past remain not as perfectly connected stories but as stepping stones to everything that follows.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  The farthest back my memory takes me, I was barely two years old. I can still feel the coarse fabric of the chair beneath me, my small legs dangling over the side. My older sister, whether out of mischief or malice, gave me a sudden push. The next thing I knew, I was face first in the unlit fireplace. The bitter taste of soot mixed with the sharp tang of blood from my split lip is a sensation I can recall as if it happened yesterday. That moment, raw and vivid, marked the beginning of my scattered recollections.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Our home back then was rustic, hidden among towering trees and anchored by the imposing presence of an old barn. The barn, with its weathered wooden planks, seemed like it carried a lifetime of secrets. The trees around us felt both protective and mysterious, their twisted branches forming a canopy over our small world. I vividly remember the adults whispering about a panther one night after piercing screams echoed from the woods. Whether it was just the wind or something wild truly lurking out there, the fear in their voices was enough to ignite my imagination and fill the night air with a sense of unease.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Amid those memories were a few memorable moments with my parents. I can still picture the three of us in a small boat gliding across the pond. The ripples on the water mirrored the calm around us as if the world had paused to indulge in the stillness. It was a peace so absolute that I still long for it when life feels overwhelming.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Another vivid memory is of a day spent picking flowers with my mother down our long driveway, the warmth of the sun on my small hands as I clutched the colorful blooms. Among the wildflowers, we stumbled upon a tiny kitten, its soft fur trembling with fear. I scooped him up and, feeling quite proud, declared his name would be "Blossom." It seemed perfect for the moment, but laughter erupted when someone pointed out that Blossom was a boy, and naming him that apparently wasn’t "right." Back then, I didn’t know names had rules. Blossom felt true to me even if it didn’t to everyone else.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  I don’t clearly remember leaving that house, but we did. Those days blur together, fragments that don’t quite connect. I must have been three or four when we moved because not long after, the anticipation for grade school filled my small world. The thought of starting school made me both excited and nervous. There were new faces to meet, lessons to learn, and a rhythm to life I hadn’t yet experienced. It was like the first door to a larger, more complicated world had opened before me.
                </p>
              </div>

              {/* Chapter 2 */}
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 mb-12">
                <h2 className="font-serif text-3xl font-bold mb-6 text-foreground">Chapter 2: Life on the Farm</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  I didn’t set out to become a farmer. It just sort of happened. When we moved to the next house, my parents struck some kind of deal with a doctor. He owned a lot of cattle and needed someone to work the farm. From what I understand, the arrangement lowered our rent or something along those lines. That’s how we ended up with more cows than I could count, a barn as tall as the sky itself, and a corral that practically became a second home.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Along with the cows, we had the horses my mom brought with her all the way from California, remnants of a life we’d left behind when our story began. There were Nubian goats too, their floppy ears soft in my hands. The goats were work, not that I minded much. Milking them felt like second nature after a while. The first few tries I was clumsy, but eventually I got the hang of it. It always amazed me how goat cheese was made by letting the milk "rot," as my young mind understood it. Life on the farm came with its own set of wonders and lessons.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  My sister was four years older than me and my brother two, but being the youngest didn’t come with any perks. If anything, I felt it made me work harder. I got no special treatment, no coddling. Just the same chores and the same expectations. Farm life toughened me up. Whether I was dodging my depressed, resentful father, working the goats, or trying to stay out of trouble, it shaped me.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Kindergarten, though, was a whole different world. My first day wasn’t exactly a shining moment. I cried. Hard. I didn’t want my mom to leave me there surrounded by kids I didn’t know in a place I couldn’t make sense of yet, but once the tears dried and I settled in, things started to click. It didn’t take long for me to make my first friend, and soon enough school became easy, almost too easy.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  I wasn’t like the other kids. It was clear pretty fast. Maybe it was my shoes. I didn’t understand why mine didn’t belong with theirs. What was so special about their Nikes or Jordans? And why were they laughing at my plain ones? I didn’t even know who Shaq was, but somehow my shoes seemed to matter more than me. It didn’t make sense. Back on the farm, a good pair of sturdy boots was all you needed. This was my first real glimpse of how wrapped up people can get in material things and how cruel they could be when someone didn’t fit into their mold. Kids can be meaner than anything.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  That’s when I discovered something that I disliked a lot. I hated bullies. Hated them with every fiber of my being. Even as a kid, I wasn’t about to stand by. If someone needed defending, I was there ready to step in. Maybe it was farm life that made me strong. All that physical work had me outrunning, out throwing, and out kicking just about everyone else. I wasn’t scared to use that strength to protect someone who couldn’t stand up for themselves. Looking back, those moments felt like a spark, the beginnings of the person I was growing into. A kid with compassion and empathy who loved doing good for people.
                </p>
              </div>

              {/* Chapter 3 */}
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 mb-12">
                <h2 className="font-serif text-3xl font-bold mb-6 text-foreground">Chapter 3: A Boy Caught Between Dreams and Duty</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Life on the farm wasn’t easy, but it wasn’t my place to complain. I didn’t understand the bigger picture, and asking “why” wasn’t an option. My job was simple. Do the work, take care of the land, the animals, and my mom’s prized collies. She and my sister were off most weekends heading to dog shows out of state, chasing ribbons and rosettes. Meanwhile back home, I was in the fields or the barn making sure everything was as it should be. It wasn't very easy having so many animals. I made friends with all of them, and in turn I have experienced the death of more friends than anyone I know. 50? 60? 70 even? I have lost count, but it takes its toll on a child.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Maybe that was why I wasn’t allowed to try out for sports. Or maybe it was because I had to ride the bus over an hour just to get home in time to be free labor. Whatever the reason, it didn’t matter much. I knew what was expected of me, and it wasn’t shooting hoops or throwing touchdowns. Still, I couldn’t help but dream about what could’ve been. If I had the chance, I know I could’ve been somebody. Playing basketball in the fading evening light or sprinting through the fields tossing a football with my brother, I felt unstoppable, like I was born to do something great, but dreams weren’t chores. And on the farm, chores came first.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  I can still see those early morning walks to the barn, the ground wet with dew. We didn’t have fancy gear to keep dry. I made do with grocery bags tied around my shoes. They didn’t keep my feet from freezing, but at least they kept the dampness out. The baby goats needed feeding, and no matter how cold or dark it was, they were waiting.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  School wasn’t an easy respite either. I trailed behind my brother and sister who each left massive shoes to fill. Straight A’s and perfect scores. We are talking about report cards anyone would frame. It felt like I was walking in the shadow of giants. Although I could keep up academically, it wasn’t what I wanted. Being invited to the Gifted and Talented program didn’t excite me like it probably should have. I didn’t want to be the kid with all the right answers. I wanted to be the kid on the court or the field, scoring the points and taking the win.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  It wasn’t all responsibility and longing though. Around the fourth grade, I remember seeing her for the first time. She wasn’t like the other kids. She was magnetic, the kind of beauty that doesn’t make sense to a kid but sticks in your head anyway. Then at the church Christmas program, we finally spoke. We practiced singing “Silent Night” together, and bit by bit I felt something new and exciting grow in me. To my young heart, we were boyfriend and girlfriend. Then she was gone. Her parents split, she moved to Colorado, and just like that she disappeared. Her absence was like losing something I didn’t get the chance to hold on to.
                </p>
              </div>

              {/* Chapter 4 */}
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 mb-12">
                <h2 className="font-serif text-3xl font-bold mb-6 text-foreground">Chapter 4: Forged in Fire</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Growing up on that farm was no fairytale. The violence, the beatings, and the chaos. I carried all of it with me. Doors slamming, voices raised, the sting of a belt or an open hand. It was a rhythm I grew up with, as familiar as the rooster crowing at sunrise. There were times when I felt more like a punching bag than a kid. Those moments left marks in places no one could see.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  But as much as it hurt, I didn’t crumble under it. I learned early on that you don’t have the luxury of slowing down just because things are hard. Whether it was getting knocked down literally or being told I wasn’t enough, every hardship became fuel. At night when the animals were fed and the barn was quiet, I would shoot hoops alone until I was exhausted. It was my outlet.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  The violence at home taught me a cruel kind of resilience. I didn’t have time to wallow. I had siblings to look up to, chores to complete, and expectations to meet. Between the farm work and the chaos indoors, I learned to bury my emotions deep. Showing weakness wasn’t an option.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  By the time I reached my early teens, I had a reputation for being strong both physically and emotionally. I had arms built from lifting hay bales and legs conditioned to carry me across fields with speed and power. Nobody messed with me, but I was still a kid with dreams. Not just of sports or achievements but of something more. I wanted to prove to myself that I was more than what I’d been through.
                </p>
              </div>

              {/* Chapter 5 */}
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 mb-12">
                <h2 className="font-serif text-3xl font-bold mb-6 text-foreground">Chapter 5: Becoming My Own Person</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Sometimes I find myself wondering how I ended up so different from the environment that shaped me. The world I was born into and the one that made me who I am are such a stark contrast. It is like standing on the other side of a bridge you never thought you would cross. My early years were steeped in struggle, marked by hard labor and at times harshness. Life was about survival, not self discovery. And yet here I am, someone entirely different from the boy I was back then.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  When people talk about childhood, there is often a sense of freedom in their stories. A lightness. For me, there was none of that. My days were measured by tasks and the weight of expectation, but looking back, I realize that those years taught me more than just survival. They taught me who I didn’t want to be.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  I saw firsthand what anger and bitterness could do to a person. How frustrations, unchecked and unprocessed, could explode in ways that hurt everyone nearby. From a young age, I knew I didn’t want to carry that forward. I didn’t want to live my life fueled by resentment or perpetuate cycles of pain. Slowly I started to carve out my own path, one that veered far away from the one set before me.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Instead of holding onto the weight of my past, I chose to lean on the strengths it had given me. That strength, the same one that hauled hay bales and milk buckets, became my foundation for something new. It fueled my determination to grow beyond my circumstances. My upbringing didn’t leave much room for softness or vulnerability, but those were the very things I found myself drawn to as I grew older. I realized that strength wasn’t about being stoic or shutting the world out. It was about letting people in, being kind, and breaking the walls that were built around me.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Those Velcro strap tennis shoes I wore growing up became a symbol of something bigger for me. For a long time, they made me feel like I wasn’t enough, that my worth was tied to what I didn’t have, but eventually I realized how wrong that was. My worth didn’t come from someone else’s perception or from material things. The sacrifices I made, the responsibilities I carried, and the relentless work I put in were proof of my strength.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Forgiveness was another turning point. A hard one, but one that mattered. The anger I held onto felt justified for years. It clung to me like armor, protecting me from the parts of my past I didn’t want to face, but forgiveness wasn’t about excusing what had happened. It was about freeing myself from the grip it had on me. When I finally allowed myself to forgive not just others but also the boy I was, I felt lighter. Like I could breathe again. That is when I fully started to own my story.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Standing here now, I don’t see my transformation as a rejection of where I came from but as a reclamation of who I was always meant to be. My upbringing might have shaped me, but it doesn’t define me. I have taken those lessons, both the good and the brutal, and used them to build something better. I don’t just survive anymore. I thrive, fully aware of my worth. And that is something no part of my past could take away.
                </p>
              </div>

            </article>


          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Story;
