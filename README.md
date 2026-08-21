# Elite Glass Fit

Build a complete premium mobile-first fitness application called:

ELITE GYM TRACKER — ABDELDJALIL

I want this designed primarily for Android phones, especially my Redmi Note 14 Pro 5G Global, but the frontend must remain a highly responsive HTML/CSS/JavaScript web application that can later be packaged into an Android app with Capacitor.

Do NOT build a desktop-first website.

This must feel like a premium mobile application.

==================================================
TECHNOLOGY

Use a clean modern web architecture.

Keep the application:

HTML/CSS/JavaScript based

mobile-first

offline-friendly

installable as a PWA

compatible with Capacitor later

Do NOT use native Kotlin UI.

Do NOT use Jetpack Compose.

Do NOT use Android XML layouts.

Do NOT design around desktop screens.

Keep the UI and interactions in the web layer.

==================================================
DESIGN DIRECTION

Create a premium dark fitness application inspired by modern Apple-style Liquid Glass design.

Do not copy Apple's proprietary implementation.

Instead reproduce the visual principles:

translucent glass

subtle transparency

controlled backdrop blur

edge reflections

internal highlights

soft depth

rounded geometry

atmospheric lighting

elegant motion

precise spacing

refined typography

minimal professional icons

The application should feel expensive and polished.

NOT:

generic dashboard

generic Material UI

plain glassmorphism template

default HTML

desktop SaaS dashboard

==================================================
BACKGROUND

Use a rich dark OLED-style background.

Primary atmosphere:

deep navy

dark blue

electric blue accents

subtle violet

subtle purple

Create extremely subtle ambient lighting using blurred radial gradients.

The background should feel alive without becoming distracting.

Use slow GPU-friendly movement where practical.

Do not use bright neon cyberpunk styling.

==================================================
LIQUID GLASS

Create a reusable Liquid Glass design system.

Use CSS variables for:

glass background

active glass background

border

edge highlight

internal highlight

shadow

blur

saturation

tint

corner radius

The glass should have:

translucent base

visible underlying content

subtle edge reflection

upper-edge highlight

soft internal reflection

depth shadow

gentle tint

Do NOT simply use:

background: rgba(...)

The material should look layered.

Do NOT put massive blur on every element.

The strongest Liquid Glass effects should be used for:

bottom navigation

active navigation indicator

timer sheet

major floating controls

selected controls

==================================================
BOTTOM NAVIGATION

Create a premium floating bottom navigation.

Tabs:

HOME
WORKOUTS
PROGRESS
COACH
SETTINGS

The navigation should:

float above the bottom edge

respect Android safe areas

have translucent glass

have subtle edge reflections

have reduced/moderate blur

allow the content underneath to remain visible

have excellent touch feedback

Do NOT make it look like a standard Android navbar.

==================================================
ACTIVE NAVIGATION INDICATOR

Create one continuous active glass indicator.

When switching:

Home → Workouts

the same indicator travels between the tabs.

It must NOT disappear and reappear.

While moving, the glass indicator should:

stretch horizontally

become slightly elongated

shift its highlight

subtly morph its shape

travel along the actual tab-center path

When it arrives:

contract

settle

become perfectly centered around the new icon

The movement should feel fluid and liquid.

At rest it should be a compact rounded glass shape.

==================================================
ICON DESIGN

Use a consistent premium SVG icon system.

No emoji.

No Unicode icons.

No random icon styles.

Every icon must:

be optically centered

have consistent visual weight

have active/inactive states

animate subtly when selected

==================================================
HOME SCREEN

Make Home feel rich and alive.

It should act as the user's training command center.

Structure:

Personalized header

Today's workout hero

Weekly schedule

Program progress

Recovery/readiness

Nutrition

Today's coaching tip

Training principles

Recent activity

Do not fill space with meaningless cards.

==================================================
PERSONAL HEADER

Show:

ABDELDJALIL

Current program week

Today's training session

Goal:

75 KG

Include a subtle profile area.

==================================================
TODAY'S WORKOUT

Create a large premium hero card.

Show:

Today's workout

Training type

Exercise count

Total sets

Completed sets

Workout progress

START WORKOUT / CONTINUE WORKOUT

The current workout must automatically use the actual calendar schedule.

==================================================
WEEKLY SCHEDULE

Use this EXACT weekly split:

SATURDAY → UPPER — STRENGTH

SUNDAY → LOWER — STRENGTH

MONDAY → REST / RECOVERY

TUESDAY → PUSH — HYPERTROPHY

WEDNESDAY → PULL — HYPERTROPHY

THURSDAY → LEGS — HYPERTROPHY

FRIDAY → REST / RECOVERY

Use actual JavaScript date detection.

Do NOT hard-code today's session.

The Home screen should automatically identify the correct current day.

For Wednesday:

Today's Session:

PULL

HYPERTROPHY

The weekly selector should display:

SAT SUN MON TUE WED THU FRI

as a single horizontal 7-column layout.

Every day slot must be perfectly centered.

==================================================
12-WEEK PROGRAM

Track:

Week X / 12

Workout completion

Set completion

Program progress

Streak when real data exists

Do not invent statistics.

Use animated progress indicators.

==================================================
NUTRITION

Use these targets:

3,250 kcal/day

165 g protein

400–405 g carbohydrates

110 g fats

Create compact premium macro cards.

Make the progress indicators animated.

Values must be editable later.

==================================================
TRAINING COACH / EDUCATION

Create a dedicated COACH tab AND a rich Home section called:

TODAY'S COACHING TIP

Build training education around these principles:

SPECIFICITY

Training adaptations are specific to the type of work performed. Training should match the desired goal.

OVERLOAD

The body needs a sufficiently challenging training stimulus to create adaptation.

PROGRESSION

Progress should be managed over time rather than trying to make every workout dramatically harder.

DOUBLE PROGRESSION

For a prescribed range such as 3 × 8–10:

stay within the range.

When all working sets reach the top of the range with clean technique and the planned RIR, increase the load slightly.

Do not automatically change the weight without user confirmation.

RIR

Reps In Reserve.

Explain that RIR estimates how many additional good repetitions could have been performed.

Use the program's progression:

Weeks 1–2: approximately 3 RIR

Weeks 3–4: approximately 2 RIR

Weeks 5–6: approximately 1–2 RIR

Do not encourage routine failure training.

RECOVERY

Training adaptation requires recovery.

Target:

7–9 hours sleep

If performance repeatedly drops or recovery is poor, reduce training stress rather than blindly forcing progression.

VOLUME

More sets are not automatically better.

Use an amount of training that is productive and recoverable.

FAILURE TRAINING

Explain the difference between training close to failure and taking every set to absolute failure.

Keep routine training controlled.

EXERCISE SELECTION

Prioritize effective movements, stable technique, appropriate range of motion, progression, and recoverability.

MACHINES VS FREE WEIGHTS

Explain that both can be useful.

Machines can provide stability and controlled loading.

Free weights can provide greater movement freedom and coordination demands.

Do not make simplistic claims that one category is universally superior.

KEEP TRAINING SIMPLE

More exercises and techniques do not automatically produce better results.

Effective training should be progressive, recoverable, and sustainable.

SPLIT ROUTINES

Explain that splitting training across days can organize training volume and recovery.

Connect this directly to the user's:

Upper
Lower
Rest
Push
Pull
Legs
Rest

SUPERSETS

Explain pairing exercises with limited rest.

Explain potential uses such as saving time and increasing density.

PRE-EXHAUSTION

Explain performing an isolation exercise before a compound movement to pre-fatigue a target muscle.

Present it as an optional technique, not a mandatory part of the program.

DROP SETS

Explain reducing the load after a set and continuing with additional repetitions.

Present it as an advanced optional technique.

PERIODIZATION

Explain organizing training into phases with changes in loading and training stress over time.

WARM-UP

Use:

2–4 gradual warm-up sets for the first major movement.

These do not count as working sets.

TECHNIQUE

Controlled repetitions.

Consistent range of motion.

Stable setup.

Technique should take priority over simply adding weight.

==================================================
COACHING CARDS

Make these into interactive premium cards.

Each card should show:

Title

Short principle

"Why it matters"

"Apply it to your program"

When tapped, the card expands into a premium detail view.

==================================================
WORKOUTS

Use the current program:

SATURDAY — UPPER STRENGTH

Flat Bench Press — 3 × 6–8 — 120s

One-Arm Dumbbell Row — 3 × 8–10 — 90s

Shoulder Press Machine — 3 × 8–10 — 120s

Lat Pull Down Machine — 3 × 8–10 — 90s

Seated Dip Machine — 2 × 10–12 — 90s

Dumbbell Bicep Curl — 2 × 10–12 — 60s

SUNDAY — LOWER STRENGTH

Leg Press Machine — 3 × 8–10 — 180s

Barbell RDL — 3 × 10–12 — 120s

Leg Curl Machine — 3 × 10–12 — 90s

Leg Extension Machine — 3 × 12–15 — 90s

Standing Calf Machine — 4 × 10–12 — 60s

TUESDAY — PUSH HYPERTROPHY

Incline Bench Press — 3 × 10–12 — 90s

Leaning DB Lateral Raise — 4 × 12–15 — 60s

Chest Fly Machine — 3 × 12–15 — 60s

DB Skullcrusher — 3 × 15–20 — 60s

Dumbbell Lateral Raise — 2 × 15–20 — 45s

WEDNESDAY — PULL HYPERTROPHY

Cable Row Machine — 3 × 10–12 — 90s

Lat Pull Down (Underhand) — 3 × AMRAP — 90s

Bent-Over DB Reverse Fly — 3 × 15–20 — 60s

Barbell Bicep Curl — 3 × 12–15 — 60s

Dumbbell Rear Delt Row — 3 × 15–20 — 60s

Flat Bench DB Crunch — 3 × 15–20 — 60s

THURSDAY — LEGS HYPERTROPHY

Hack Squat Machine — 3 × 12–15 — 120s

Dumbbell RDL — 3 × 15–20 — 90s

Walking Lunges (DB) — 2 × 12/leg — 90s

Calf Press Machine — 4 × 15–20 — 60s

Leg Extension (Finisher) — 2 × 20–30 — 60s

MONDAY / FRIDAY = REST / RECOVERY

==================================================
WORKOUT TRACKING

Every exercise must support:

set completion

weight input

reps input

RIR input

workout progress

workout history

All inputs must remain inside their cards at every screen width.

Never allow horizontal overflow.

==================================================
REST TIMER

When a set is completed, automatically present a premium floating rest timer.

The timer should rise from the bottom.

Use Liquid Glass.

Features:

countdown

progress ring

exercise name

current set

pause

skip

reset

-15 sec

+15 sec

The background behind the timer should have moderate blur.

Do NOT make it excessively blurry.

==================================================
TIMER NUMBER ANIMATION

When:

01:30

changes to:

01:29

animate the changing digit vertically.

The digit should smoothly drop/roll into the new value.

Use transform + opacity.

Keep the overall timer perfectly centered.

The colon should subtly pulse while the timer is running.

When paused, the colon should stop.

==================================================
PROGRESS ANIMATIONS

Animate:

workout progress

weekly progress

program progress

nutrition bars

rings

completed sets

Use smooth interpolation.

Do not make progress jump instantly.

==================================================
TRANSITIONS

Every tab switch should have coordinated premium motion.

Use:

slight scale

opacity

subtle blur

directional movement

Do NOT make navigation feel like a browser page reload.

Exercise cards should have smooth transitions into exercise detail views.

==================================================
PERFORMANCE

Target:

Redmi Note 14 Pro 5G Global

Prioritize smoothness and high-refresh-rate interaction.

Use GPU-friendly CSS:

transform

opacity

Avoid:

unnecessary layout recalculation

enormous DOM trees

excessive blur

continuous expensive JavaScript loops

memory leaks

unnecessary polling

Do not artificially consume CPU/GPU.

Use resources for actual visual rendering.

==================================================
PWA / ANDROID READINESS

Make the application installable as a PWA.

Include:

manifest

proper icons

splash/loading configuration where appropriate

mobile viewport

standalone display mode

appropriate theme colors

offline-friendly assets

Make the frontend suitable for packaging with Capacitor later.

Do NOT use external CDN dependencies for essential functionality.

==================================================
APP ICON

Create the project so a custom launcher icon can be added later.

Use a proper high-resolution icon asset.

==================================================
DATA STORAGE

Store workout progress locally.

Persist:

weight

reps

RIR

completed sets

completed workouts

history

current week

nutrition settings

profile settings

Do not require a server for core functionality.

==================================================
VISUAL QUALITY

Everything should be:

perfectly aligned

responsive

centered

consistent

premium

smooth

No:

overflowing inputs

broken grids

vertically stacked weekday letters

misaligned buttons

default browser inputs

default browser buttons

content hidden underneath navigation

==================================================
IMPORTANT IMPLEMENTATION RULE

Do not just create a beautiful mockup.

Create the actual functional application.

Every button must work.

Every navigation tab must work.

Every workout must work.

The timer must work.

Progress must persist.

The calendar logic must work.

The application should be usable daily.

==================================================
FINAL TARGET

I want this to feel like an expensive, polished mobile fitness application.

The visual language should be:

dark OLED

blue/purple atmosphere

Liquid Glass

premium motion

precise alignment

high-refresh-rate feel

rich training content

professional workout tracking

Build the application now and iterate on the visual quality until the mobile interface feels genuinely production-ready.

Do not stop at a prototype.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f47ee077-fc97-4539-8828-93eb7434f7fb).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
