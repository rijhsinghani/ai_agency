-- =============================================================================
-- Migration: 002_content_bank.sql
-- Purpose:   Create content_bank and brands tables with seeded data
-- Extends:   001_initial_schema.sql (do NOT modify that file)
-- Verified:  Extends content_engine_videos, content_engine_brand_voice tables
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Table: brands
-- Purpose: Credential routing and voice profile mapping per brand
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE CHECK (name IN ('sameer_automations', 'raj_photo_video')),
  handle TEXT NOT NULL,
  platform_credentials JSONB DEFAULT '{}',
  voice_profile_id UUID REFERENCES content_engine_brand_voice(id),
  visual_style_guide TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- Table: content_bank
-- Purpose: Single source of truth for all content topics across brands
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS content_bank (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand TEXT NOT NULL CHECK (brand IN ('sameer_automations', 'raj_photo_video')),
  topic_title TEXT NOT NULL,
  hook TEXT NOT NULL,
  talking_points JSONB NOT NULL DEFAULT '[]',
  platform_angles JSONB NOT NULL DEFAULT '{}',
  visual_assets JSONB DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'idea' CHECK (status IN (
    'idea', 'draft', 'ready', 'recorded', 'processing',
    'pending_review', 'approved', 'published', 'archived', 'rejected'
  )),
  source_video_id UUID REFERENCES content_engine_videos(id) ON DELETE SET NULL,
  reddit_topic_ids TEXT[],
  service_package_links TEXT[],
  sync_source TEXT DEFAULT 'supabase',
  sheets_row_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- Trigger: auto-update updated_at on content_bank
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_content_bank_updated_at
  BEFORE UPDATE ON content_bank
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------------------------------------
-- Seed: brands
-- -----------------------------------------------------------------------------
INSERT INTO brands (name, handle, visual_style_guide) VALUES
  ('sameer_automations', '@SameerAutomates', 'brand/brand-voice.md'),
  ('raj_photo_video', '@RajPhotoVideo', 'brand/raj-brand-voice.md')
ON CONFLICT (name) DO NOTHING;

-- -----------------------------------------------------------------------------
-- Seed: content_bank — 12 topics from Reddit topic bank (sameer_automations)
-- -----------------------------------------------------------------------------

-- Topic 1 (Rank 4): Missed Calls Losing Customers to Competitors
INSERT INTO content_bank (brand, topic_title, hook, talking_points, platform_angles, service_package_links, reddit_topic_ids) VALUES
(
  'sameer_automations',
  'How Missed Calls Are Costing HVAC Owners $2,000/Month',
  'Every missed call after 5pm is a $500 job walking straight to your competitor',
  '["HVAC owners miss 30-40% of after-hours calls while on-site", "Automated text-back recaptures 15-20% of those leads within minutes", "Average HVAC job value: $400-800 — one recovered lead covers the entire setup cost", "Setup cost: $1,500 one-time build fee, $200/mo retainer", "Real result: community member recovered 3 leads in first month using automated text-back"]',
  '{"youtube_long": "Full walkthrough: how we set up missed-call text-back for an HVAC owner and what happened in the first 30 days — step by step, including Twilio setup and the exact message template", "youtube_short": "The one automation every HVAC owner needs — set up in under an hour and running 24/7", "twitter": "Thread: HVAC owner was losing 3 calls a day while on roofs. Here is exactly what we built to fix it — and what happened in 30 days", "instagram": "Before: 3 missed calls per day, leads going cold. After: automated text-back within 30 seconds, leads staying warm. Here is how.", "substack": "Deep dive: the economics of missed-call automation for home services — why the math works even at $200/month retainer", "threads": "Hot take: if you own a trades business and you are not running missed-call text-back, you are leaving $2k+/month on the table. Here is the math."}',
  '["ops/packages/missed-call-text-back.md"]',
  ARRAY['missed-calls-hvac', 'missed-calls-smallbusiness', 'missed-calls-nocode']
);

-- Topic 2 (Rank 5): Quotes Sent With No Follow-Up or Close
INSERT INTO content_bank (brand, topic_title, hook, talking_points, platform_angles, service_package_links, reddit_topic_ids) VALUES
(
  'sameer_automations',
  'Why 70% of Your Sent Quotes Go Cold (And the 3-Touch Sequence That Recovers Them)',
  'You sent the quote. They said they would think about it. That was 10 days ago.',
  '["Industry data: businesses following up within 24 hours close 2x more quotes than those that do not", "The r/entrepreneur thread: one owner went from 23% to 41% close rate in 60 days with a simple follow-up sequence", "3-touch sequence: Day 2 check-in, Day 5 questions offer, Day 10 expiry nudge", "Automation stops the moment they reply or book — no awkward messages after they have already said yes", "A roofing company recovering 2 additional closes per month at $2,000 average = $4,000/month from a $2,000 build"]',
  '{"youtube_long": "I built a 3-touch follow-up sequence for a lawn care business that was losing quotes to silence — here is the exact workflow, the message templates, and the before/after close rate numbers", "youtube_short": "3 texts, automated, sent over 10 days — this is why your close rate is low and how to fix it", "twitter": "Thread: small business owners are leaving 30-50% of their quotes on the table because of one habit: not following up. Here is the fix.", "instagram": "Quote sent. No response. Week goes by. Sound familiar? Here is the 3-message sequence that changes that.", "substack": "The quote follow-up problem: why most service businesses have a follow-up deficit, not a pricing problem — and how to automate the fix", "threads": "Unpopular opinion: most small business owners do not have a pricing problem. They have a follow-up problem. Thread on what that costs them."}',
  '["ops/packages/quote-follow-up.md"]',
  ARRAY['quotes-smallbusiness', 'quotes-entrepreneur', 'quotes-lawncare']
);

-- Topic 3 (Rank 6): Google Review Gap Vs Competitors
INSERT INTO content_bank (brand, topic_title, hook, talking_points, platform_angles, service_package_links, reddit_topic_ids) VALUES
(
  'sameer_automations',
  'From 31 Reviews to 147 in 90 Days: The Automated Follow-Up That Did It',
  'Your competitor has 150 Google reviews. You have 31. The gap is not luck — it is one automated text message.',
  '["HVAC owner quote from r/HVAC: went from 38 to 156 reviews in 5 months with automated requests sent 2 hours post-job", "Timing is the critical variable: 2 hours after job completion is peak satisfaction window, before customer moves on", "Businesses moving from 4.1 to 4.7 stars see 25-30% increase in Google Maps clicks", "30% more clicks on a business getting 30 calls/month = 9 additional calls = 4-5 additional jobs at $400 average", "Build fee of $1,500 pays back in under one month for average trades business"]',
  '{"youtube_long": "We set up automated review requests for an HVAC business that had 31 reviews and a competitor with 180 — here is the exact setup, the timing logic, and the 90-day results", "youtube_short": "The reason your competitor has 10x your Google reviews (and the 10-minute fix)", "twitter": "Thread: I asked an HVAC owner why his competitor had 180 reviews and he had 31. The answer was one automated text sent 2 hours after every job.", "instagram": "31 reviews vs 180 reviews. Same quality work. Same area. The difference: one automated text sent 2 hours after every job.", "substack": "Google reviews are compounding trust: why the gap between 30 and 150 reviews matters more than you think, and how to close it automatically", "threads": "The Google reviews gap between you and your top competitor is not about quality. It is about who asks consistently. Here is the automation."}',
  '["ops/packages/review-reputation.md"]',
  ARRAY['reviews-hvac', 'reviews-plumbing']
);

-- Topic 4 (Rank 9): Leads Going Cold from Slow Response Times
INSERT INTO content_bank (brand, topic_title, hook, talking_points, platform_angles, service_package_links, reddit_topic_ids) VALUES
(
  'sameer_automations',
  'The 5-Minute Rule That Separates $1M Trade Businesses from $300K Ones',
  'Respond in 5 minutes and close 40% of your leads. Respond in 2 hours and close 10%. Same leads. Same price. Different timing.',
  '["Speed-to-lead is 21x more effective within 5 minutes vs 30 minutes — industry benchmark", "From r/plumbing: one owner documented 40% close rate at 5-minute response vs 10% at 2-hour response", "AI-powered qualification: lead gets a text within 60 seconds, answers 2-3 questions, books directly to your calendar", "You see a new appointment. You never touched your phone.", "A plumber going from 2 to 7 closed jobs per month at $700/job = $3,500/month recovered from a $2,500 build"]',
  '{"youtube_long": "I built an AI lead qualification system for a plumber who was closing 10% of his leads because he could not respond fast enough — here is the workflow, the exact questions the AI asks, and the 30-day numbers", "youtube_short": "Why your lead close rate is low (hint: it is not your price) — the 60-second fix", "twitter": "Thread: a plumber responding in 2 hours closes 10% of leads. The same plumber responding in 5 minutes closes 40%. I built the automation that makes 60-second response the default.", "instagram": "You get a lead at 2pm. You are on a job. By the time you call back at 5pm, they have booked someone else. Here is what we built to fix that.", "substack": "Speed-to-lead: the one variable that explains most of the revenue gap between similar service businesses — and how to systematize it", "threads": "The math on slow lead response is brutal. I ran the numbers for a plumber. Thread."}',
  '["ops/packages/lead-follow-up.md"]',
  ARRAY['leads-plumbing', 'leads-electricians']
);

-- Topic 5 (Rank 11): No-Shows and Last-Minute Cancellations
INSERT INTO content_bank (brand, topic_title, hook, talking_points, platform_angles, service_package_links, reddit_topic_ids) VALUES
(
  'sameer_automations',
  'This Simple Automation Cut a Cleaning Company No-Shows from 15% to 3%',
  'Six appointments per month are empty driveways and wasted labor. That is $1,800 you will never get back.',
  '["A cleaning service running 40 appointments/month at 15% no-show loses 6 jobs = $1,800/month in lost revenue", "24-hour reminder + 1-hour reminder cuts no-shows by more than half for most appointment-based businesses", "Reschedule link in the text: customer picks their own new time, no phone tag, no back-and-forth", "Cancellation notification fires immediately so you can fill the slot before it costs you a full day", "Build pays back in under 2 months for any business running 25+ scheduled appointments/month"]',
  '{"youtube_long": "We built an appointment reminder system for a cleaning service running 40 jobs per month with a 15% no-show rate — here is the exact setup, the timing, and the before/after numbers after 60 days", "youtube_short": "6 empty driveways per month. $1,800 in lost revenue. Here is the two-text sequence that fixes it.", "twitter": "Thread: a cleaning service owner was losing $1,800/month to no-shows. The fix was two automated texts — one 24 hours before, one 1 hour before. Here is exactly how it works.", "instagram": "No-show rate: 15%. After automated reminders: 3%. Same customers. Same schedule. One system.", "substack": "The no-show math: why missed appointments cost service businesses more than they realize, and the two-message sequence that solves it", "threads": "Every empty driveway is a no-show that cost you the job revenue plus the drive time. Here is the automation that eliminates most of them."}',
  '["ops/packages/appointment-reminders.md"]',
  ARRAY['noshows-autodetailing', 'noshows-hvac']
);

-- Topic 6 (Rank 10): Manual Client Intake and Onboarding Friction
INSERT INTO content_bank (brand, topic_title, hook, talking_points, platform_angles, service_package_links, reddit_topic_ids) VALUES
(
  'sameer_automations',
  'Stop Losing an Hour a Day to Client Paperwork: The Intake Automation Every Service Business Needs',
  'Manually entering client info from emails into 3 different systems. Every. Single. Inquiry.',
  '["r/photography quote: client intake is a nightmare — manually entering info from emails into 3 different systems", "Average small service business owner spends 45-60 minutes daily on intake admin that automation handles in seconds", "Custom intake form with conditional fields routes to different workflows based on project type automatically", "A unified system handles intake, qualification, scheduling, and follow-up without any manual steps", "Build range: $2,500-$5,000 for fully custom intake — depends on number of systems needing integration"]',
  '{"youtube_long": "I built a custom intake system for a photography studio that was manually entering client info into 3 systems for every inquiry — here is the conditional form logic, the webhook routing, and what changed after go-live", "youtube_short": "45 minutes of daily admin work reduced to zero — the intake automation for service businesses", "twitter": "Thread: a photographer was spending 45 minutes every day copying client info from emails into 3 different systems. Here is the custom intake automation we built.", "instagram": "3 systems. 1 form submission. Automatic routing. Before: 45 minutes of manual data entry per inquiry. After: zero.", "substack": "The intake problem no one talks about: why service businesses leak hours every day on data entry — and how to build a conditional intake system that eliminates it", "threads": "Hot take: most service business owners are doing 30-60 minutes of admin work that should take 0 minutes. The intake automation is the first thing to fix."}',
  '["ops/packages/custom-build-intake.md"]',
  ARRAY['intake-photography', 'intake-homeimprovement', 'intake-personaltraining']
);

-- Topic 7 (Rank 1): Business Owners Seeking Automation Help
INSERT INTO content_bank (brand, topic_title, hook, talking_points, platform_angles, service_package_links, reddit_topic_ids) VALUES
(
  'sameer_automations',
  'Reddit''s Most-Asked Automation Question Answered: The Custom Build Playbook',
  '12 posts across 8 subreddits asking the same thing: how do I actually automate this? Here is the answer.',
  '["The highest-scoring topic in our Reddit research: business owners are actively seeking automation help, they just cannot find the right builder", "They are not asking what to automate — they already know. They are asking who can build it without breaking their existing systems", "Pattern across r/HVAC, r/smallbusiness, r/photography: Zapier works for simple tasks but breaks under conditional logic and multi-system workflows", "The right fit: custom build for workflows that involve 3+ systems, conditional branching, or real-time triggers that off-the-shelf tools cannot handle", "Discovery call intake: 45 minutes to scope, fixed-price quote within 24 hours — no retainer required upfront"]',
  '{"youtube_long": "I read through 200+ Reddit posts from small business owners asking about automation. Here is what they are actually asking for — and why most automation tools fail them", "youtube_short": "The automation question every small business owner is asking on Reddit (and the real answer)", "twitter": "Thread: I scraped r/HVAC, r/plumbing, r/smallbusiness, r/photography looking for what business owners actually want to automate. Here is what I found.", "instagram": "r/HVAC, r/smallbusiness, r/photography — the same question showing up everywhere: how do I actually automate this workflow? Here is the answer.", "substack": "What 200+ Reddit posts tell us about what small business owners actually want to automate — and why most automation tools are not the right answer", "threads": "I spent an afternoon on Reddit reading posts from business owners about automation. The pattern is clear. Thread."}',
  '["ops/packages/custom-build-intake.md"]',
  ARRAY['seeking-help-autodetailing', 'seeking-help-hvac', 'seeking-help-homeimprovement']
);

-- Topic 8 (Rank 2): Repetitive Manual Tasks Consuming Owner Time
INSERT INTO content_bank (brand, topic_title, hook, talking_points, platform_angles, service_package_links, reddit_topic_ids) VALUES
(
  'sameer_automations',
  'I Watched a Plumber Spend 45 Minutes a Day on Admin Work That a $50/Mo Automation Could Do in Seconds',
  'He knew every automation he needed. He just thought building them required a developer.',
  '["From r/plumbing: speed to lead is everything. Owner responding in 5 minutes closes 40%. Responding in 2 hours closes 10%.", "Repetitive tasks are the highest-ROI automation targets: same steps, same inputs, no judgment required", "The audit framework: time per task x frequency per week = hours lost per month — find your $200 task first", "Most service business owners can recover 5-10 hours per week from admin work with a well-scoped automation stack", "The $50/mo automation is real: Twilio SMS costs, n8n self-hosted compute, minimal API overhead"]',
  '{"youtube_long": "I did a workflow audit for a plumber — mapped every task he did in a week, calculated the time cost, and identified which ones were worth automating. Here is the exact framework and what we built first.", "youtube_short": "The 5-minute audit that tells you what to automate in your business first", "twitter": "Thread: I mapped every task a plumber did in a week. 45 minutes per day was pure repetitive admin. Here is the framework for finding your highest-ROI automation target.", "instagram": "Step 1: list every task you do manually that happens more than 3 times per week. Step 2: calculate hours lost. Step 3: that is your automation roadmap.", "substack": "The time audit every small business owner should run before spending a dollar on automation — and how to use the results to sequence your builds", "threads": "Most automation advice starts with tools. I start with a time audit. Here is why it changes what you build first."}',
  '["ops/packages/lead-follow-up.md", "ops/packages/missed-call-text-back.md"]',
  ARRAY['repetitive-autodetailing', 'repetitive-realestate', 'repetitive-photography']
);

-- Topic 9 (Rank 3): Workflow Gaps With No Off-the-Shelf Solution
INSERT INTO content_bank (brand, topic_title, hook, talking_points, platform_angles, service_package_links, reddit_topic_ids) VALUES
(
  'sameer_automations',
  'Business Owners Are Begging for This Automation: Here''s How to Build It (And Sell It)',
  'From r/electricians: "wasting time on manual invoice follow-up — wish there was a way to automate this." There is.',
  '["7 posts across 6 subreddits identifying workflow gaps with no off-the-shelf solution — this is the custom build opportunity", "Common theme: they tried Zapier, it worked for the simple parts but broke on conditional logic or multi-system routing", "Invoice follow-up, lead qualification, custom intake forms with branching — all solvable with custom n8n or webhook-based builds", "The pattern: prospect is already sold on automation. They need a builder who can handle the edge cases their tools cannot.", "Positioning: you are not selling automation. You are solving the workflow problem that Zapier, HubSpot, and no-code tools could not."]',
  '{"youtube_long": "Three business owners posted the same problem on three different subreddits: a workflow gap that no off-the-shelf tool could fill. Here is how I would build the solution for each one — and what it costs.", "youtube_short": "When Zapier is not enough: the custom automation playbook for service businesses with complex workflows", "twitter": "Thread: r/electricians, r/personaltraining, r/smallbusiness — three posts, same problem: workflow gap, no off-the-shelf fix. Here is what custom automation looks like for each.", "instagram": "They tried Zapier. It broke. They tried another tool. Same thing. Here is why complex service business workflows need custom builds — and what that actually means.", "substack": "The workflow gap problem: why off-the-shelf automation fails service businesses with conditional logic, multi-system data, or non-standard triggers — and what to do instead", "threads": "Zapier is great until it is not. Here is the specific class of workflow problems that require a custom build — and how to recognize them in your business."}',
  '["ops/packages/custom-build-intake.md", "ops/packages/quote-follow-up.md"]',
  ARRAY['gaps-hvac', 'gaps-homeimprovement', 'gaps-realestate']
);

-- Topic 10 (Rank 7): Zapier Limitations Forcing Custom Solutions
INSERT INTO content_bank (brand, topic_title, hook, talking_points, platform_angles, service_package_links, reddit_topic_ids) VALUES
(
  'sameer_automations',
  'When Zapier Isn''t Enough: The Custom Automation Playbook for Trade Businesses',
  'From r/zapier: "Tried Zapier but it breaks every time one of my 3 systems updates." You are not alone — and there is a fix.',
  '["r/zapier post with 891 upvotes: tried Zapier but it breaks every time one of 3 systems updates — this is the single most upvoted automation frustration post in our research", "The Zapier failure pattern: works for linear workflows, fails on conditional branching, multi-system data joins, and API version changes", "The custom build alternative: n8n self-hosted, webhook-driven, handles conditional logic and multi-system data without breaking", "Cost comparison: Zapier at $49-299/mo with reliability problems vs custom build at $1,500-3,000 one-time + $200-300/mo retainer that actually works", "Migration path: audit your Zaps, identify the ones that break most, replace those first — do not rewrite everything at once"]',
  '{"youtube_long": "I looked at 15 Zapier workflows from service businesses that were breaking regularly. Here is the pattern, why it happens, and what a custom build looks like for the three most common failure modes.", "youtube_short": "Your Zapier keeps breaking. Here is why — and when to switch to a custom build", "twitter": "Thread: a post about Zapier breaking got 891 upvotes on r/zapier. The frustration is real. Here is the specific class of workflows where Zapier fails and what to do instead.", "instagram": "Zapier breaking for the third time this month? Here is the workflow pattern that causes it — and when it is worth switching to a custom build.", "substack": "The Zapier ceiling: a technical breakdown of why no-code automation tools fail at conditional logic, multi-system data, and API instability — and what the alternative looks like", "threads": "Hot take: Zapier is not the problem. The problem is using Zapier for workflows it was not designed for. Here is the line."}',
  '["ops/packages/custom-build-intake.md"]',
  ARRAY['zapier-nocode', 'zapier-photography', 'zapier-zapier']
);

-- Topic 11 (Rank 8): Administrative Time Drain on Revenue Activities
INSERT INTO content_bank (brand, topic_title, hook, talking_points, platform_angles, service_package_links, reddit_topic_ids) VALUES
(
  'sameer_automations',
  'The Hidden Time Tax Killing Small Service Businesses (And How Automation Fixes It for Under $200/Mo)',
  'You are running a service business. You should be doing service work. Instead you are doing admin.',
  '["r/electricians: wasting time on manual invoice follow-up — wish there was a way to automate this (312 upvotes)", "r/photography: client intake is a nightmare — manually entering info from emails into 3 different systems (267 upvotes)", "The pattern: admin time compounds. One hour per day is 5 hours per week is 20 hours per month of non-revenue work", "The $200/mo benchmark: most high-value admin automation (reminders, intake, follow-up) costs under $200/mo to run on self-hosted n8n", "Sequencing: start with the task that takes the most time AND requires zero judgment — that is the first automation to build"]',
  '{"youtube_long": "I tracked admin hours for a small service business for two weeks. Here is what I found — and which automations had the highest ROI when we started cutting the time tax down", "youtube_short": "20 hours per month of admin work. Zero of it needs to be manual. Here is where to start.", "twitter": "Thread: I mapped the admin work a small electrician business was doing manually every week. The time cost was $2,400/month equivalent. Here is what we automated first.", "instagram": "20 hours per month. That is what admin work costs the average small service business owner. Here is the first thing to automate.", "substack": "The time tax: a detailed breakdown of where service business owners lose hours to admin, how to calculate the real cost, and the sequencing framework for eliminating it", "threads": "Every hour you spend on admin is an hour you are not doing billable work or selling. Here is how to calculate your time tax and what to do about it."}',
  '["ops/packages/appointment-reminders.md", "ops/packages/missed-call-text-back.md", "ops/packages/review-reputation.md"]',
  ARRAY['admin-electricians', 'admin-lawncare', 'admin-photography']
);

-- Topic 12 (Rank 12): HubSpot Complexity Overkill for Small Trades
INSERT INTO content_bank (brand, topic_title, hook, talking_points, platform_angles, service_package_links, reddit_topic_ids) VALUES
(
  'sameer_automations',
  'HubSpot Is Overkill for Contractors: Here''s What Small Service Businesses Actually Need',
  'r/electricians: "HubSpot is overkill — anyone using something simpler for lead follow up?" Yes. Here is the answer.',
  '["634-upvote post on r/electricians: HubSpot is overkill. The question is not which CRM to use — it is whether you need a CRM at all at your scale.", "For most service businesses under $500K revenue: a Google Sheet + 3 automations beats HubSpot at 1/10th the cost and complexity", "What small service businesses actually need: missed-call text-back, lead follow-up sequence, appointment reminders — not a full CRM", "HubSpot hidden cost: 4-8 hours to learn and configure, ongoing maintenance, $50-800/mo depending on tier", "The right stack at under $500K: Twilio for SMS, n8n self-hosted for automation, Google Sheet for lead log — total cost under $50/mo"]',
  '{"youtube_long": "I looked at the tools small service businesses actually need versus what they are sold. HubSpot shows up everywhere. Here is why it is the wrong tool for most of them — and what the right stack looks like.", "youtube_short": "You do not need HubSpot. Here is what a small service business actually needs (and what it costs).", "twitter": "Thread: a 634-upvote post asked for a simpler alternative to HubSpot for lead follow-up. I have built the answer for 10+ service businesses. Here it is.", "instagram": "HubSpot: $50-800/mo, 8 hours to learn, built for 50-person sales teams. What you actually need: 3 automations, Twilio, a Google Sheet, under $50/mo.", "substack": "The tool trap: why small service businesses overpay for software they do not need — and what a right-sized automation stack looks like at under $500K revenue", "threads": "HubSpot is a great tool for the wrong customer. Here is who the wrong customer is — and what they actually need instead."}',
  '["ops/packages/lead-follow-up.md", "ops/packages/missed-call-text-back.md"]',
  ARRAY['hubspot-personaltraining', 'hubspot-plumbing']
);

-- -----------------------------------------------------------------------------
-- Seed: content_bank — 5 case study / capability brief topics (sameer_automations, status=draft)
-- Derived from content-plan.md video concepts and operations knowledge
-- -----------------------------------------------------------------------------

-- Case Study 1: Photography Business Automation Origin Story
INSERT INTO content_bank (brand, topic_title, hook, talking_points, platform_angles, service_package_links, status) VALUES
(
  'sameer_automations',
  'How I Automated My Photography Business and Why I Started Building Systems for Others',
  'I used to lose jobs — not because my work was not good, but because a client called while I was shooting and nobody picked up.',
  '["Raj Photo Video: missed calls during shoots were costing jobs to competitors who picked up the phone", "Built missed-call text-back first for own business — recovered 3 jobs in first month at roughly $1,500 average", "Built the same system for another photographer. It worked. That was the start of Sameer Automations.", "The credibility differentiator: every system sold was built first for own business — no theory, only tested workflows", "The origin story establishes the framework for every subsequent video: Sameer does not consult, he builds for himself first"]',
  '{"youtube_long": "The origin story: how running a photography business with missed calls and manual follow-up led to building the same automation stack I now sell to other service business owners — including exactly what we built and what it changed", "youtube_short": "I lost a $2,000 job because nobody picked up the phone. That is why I built this system.", "twitter": "Thread: I ran a wedding photography business. I kept losing jobs because calls went unanswered while I was on site. Here is what I built — and why I started doing this for other businesses.", "instagram": "Missed call during a shoot. Lead booked someone else. I built a system to make sure that never happened again. That system is why Sameer Automations exists.", "substack": "The origin story: from photography business owner losing jobs to missed calls, to building the automation stack that recovered them — and eventually building it for others", "threads": "I did not start as an automation consultant. I started as a photographer who kept losing leads while behind a camera. Here is what happened when I fixed that."}',
  '["ops/packages/missed-call-text-back.md"]',
  'draft'
);

-- Case Study 2: Bookkeeping Automation
INSERT INTO content_bank (brand, topic_title, hook, talking_points, platform_angles, service_package_links, status) VALUES
(
  'sameer_automations',
  'I Automated My Bookkeeping: 18 Hours Back Per Month, Zero Data Entry',
  'Last month I spent 24 hours on bookkeeping. This month the system did it for me.',
  '["Before: 24 hours per month matching receipts to invoices, categorizing expenses, manually updating records", "Built: system that parses bank and credit card statements, categorizes transactions automatically, creates QuickBooks entries", "Result: 18 hours per month recovered. No data entry. No missing transactions.", "The build: Python for parsing, QuickBooks API for entries, rule-based categorization refined over 3 months of training", "Applicability: any service business with regular, repeating transaction categories — trades, studios, cleaning services, consultants"]',
  '{"youtube_long": "I built a bookkeeping automation that parses bank statements, categorizes transactions, and creates QuickBooks entries without me touching anything — here is the exact build, the Python scripts, and the 30-day numbers", "youtube_short": "24 hours of monthly bookkeeping, automated. Here is what that looks like.", "twitter": "Thread: bookkeeping was taking me 24 hours per month. I built a system that does it automatically. Here is how.", "instagram": "24 hours of monthly bookkeeping: before. 2 hours of review: after. Here is the automation that did it.", "substack": "Automating bookkeeping for a service business: the full build log — bank statement parsing, transaction categorization, QuickBooks sync, and what it cost to build", "threads": "I automated my bookkeeping. 18 hours per month back. Zero data entry. Here is the actual system."}',
  '[]',
  'draft'
);

-- Case Study 3: The $2,400/Month Employee Replaced by $400/Month System
INSERT INTO content_bank (brand, topic_title, hook, talking_points, platform_angles, service_package_links, status) VALUES
(
  'sameer_automations',
  'This System Replaced a Part-Time Employee: $2,400/Month Cut to $400/Month',
  'Either you hire someone to manage your client workflow, or you build a system that does it for you.',
  '["A service business was managing inquiries, estimates, scheduling, and follow-ups manually — workload of a full part-time employee", "Cost of part-time ops hire: $2,400/month. Cost of unified automation system: $400/month retainer after one-time build.", "The system: intake form routing, lead qualification, calendar scheduling, follow-up sequences — all without human intervention", "80% reduction in ops workload in the first 60 days of running the unified system", "The math: $2,000/month savings on retainer alone. Build fee recovered in under 2 months."]',
  '{"youtube_long": "A service business was spending $2,400/month on part-time ops support. We replaced 80% of that workload with a unified automation system. Here is every piece of it — the intake, the routing, the scheduling, the follow-up.", "youtube_short": "$2,400/month employee. $400/month system. Same work done. Here is how.", "twitter": "Thread: a service business needed a part-time employee just to handle ops. We built a $400/month system that does 80% of what that employee would have done. Here is everything in it.", "instagram": "$2,400/month ops hire. $400/month system. 80% of the same work. This is what unified automation looks like for a service business.", "substack": "Replacing part-time operations support with automation: the full case study — what the manual workflow looked like, what we built, and the 60-day numbers", "threads": "The real cost of not automating your service business ops: you either build a system or you hire a person. Here is what building looks like."}',
  '["ops/packages/lead-follow-up.md", "ops/packages/missed-call-text-back.md", "ops/packages/appointment-reminders.md"]',
  'draft'
);

-- Case Study 4: The Content Engine (AI content generation pipeline)
INSERT INTO content_bank (brand, topic_title, hook, talking_points, platform_angles, service_package_links, status) VALUES
(
  'sameer_automations',
  'How My Content Engine Turns Business Knowledge into Social Posts and Emails (4 Hours Saved Per Week)',
  'I dump my thoughts into it. It generates 10 options. I pick one and hit publish. Four hours saved per week.',
  '["Before: manually writing 3 social posts, 2 emails, and 1 long-form piece per week while running a business — unsustainable", "Built: voice memo or rough notes go in, AI pipeline generates platform-specific drafts, review and publish", "4 hours per week recovered. Quality is higher because Sameer does the thinking, the system does the typing.", "The pipeline: transcription, content extraction, platform-specific formatting, draft generation via Claude API", "Applicability: any business owner who produces any recurring content — newsletters, social posts, follow-up email sequences"]',
  '{"youtube_long": "I built a content pipeline that takes my rough ideas and generates social posts, email drafts, and short-form content — here is the exact stack, the prompts, and what a week of content production looks like now versus before", "youtube_short": "4 hours per week saved on content creation. Here is the pipeline that does it.", "twitter": "Thread: I was spending 4 hours per week writing content. Now I spend 20 minutes. Here is the pipeline I built — and how you could build something similar.", "instagram": "Voice memo in. 10 content drafts out. Here is the content engine I built to stay consistent without burning time.", "substack": "Building a personal content engine: the full technical breakdown — transcription, extraction, Claude API drafting, and platform formatting for a solo operator", "threads": "I built a system that turns my rough ideas into polished social posts and emails. Here is everything in it."}',
  '[]',
  'draft'
);

-- Case Study 5: The Automation Evaluation Framework
INSERT INTO content_bank (brand, topic_title, hook, talking_points, platform_angles, service_package_links, status) VALUES
(
  'sameer_automations',
  'What''s Worth Automating (And What Isn''t): The Framework I Use With Every Client',
  'I built a client a $300/month automation for a 12-minute-per-week task. That was a mistake. Here is what I do now.',
  '["Not everything should be automated: some tasks take 5 minutes but require human judgment that automation cannot replicate", "The framework: 3 variables — time per task, frequency per week, judgment required. High time + high frequency + low judgment = automate.", "The mistake: automating a 12-minute/week task at $300/mo = negative ROI by any measure", "The right test: would a non-technical person doing this task ask any questions, or just follow the same steps every time? If no questions: automate.", "Delegating vs automating vs eliminating: before building, ask whether the task should exist at all"]',
  '{"youtube_long": "I walked through the automation evaluation framework I use with every client — including the mistake I made early on that cost a client $300/month for a task that took 12 minutes per week. Here is the full framework and real examples.", "youtube_short": "The one question I ask before building any automation (I got it wrong early on)", "twitter": "Thread: I built an automation for a client that cost $300/month and saved them 12 minutes per week. That was a mistake. Here is the framework I use now before building anything.", "instagram": "Before building any automation: time per task, frequency per week, judgment required. If the answer to all three passes this test, then build. Here is the test.", "substack": "The automation evaluation framework: a practitioner guide to deciding what to automate, what to delegate, and what to eliminate — with real examples of each", "threads": "Not everything should be automated. Here is the 3-variable test I run before building anything for a client."}',
  '[]',
  'draft'
);

-- -----------------------------------------------------------------------------
-- Seed: content_bank — 3 Raj Photo Video cross-pollination topics
-- -----------------------------------------------------------------------------

-- Raj Topic 1: Photography booking automation
INSERT INTO content_bank (brand, topic_title, hook, talking_points, platform_angles, service_package_links, status) VALUES
(
  'raj_photo_video',
  'How We Automated Wedding Inquiry Follow-Up and Stopped Losing Leads During Shoots',
  'A potential client called during a ceremony. By the time we called back, they had booked another photographer.',
  '["Photography studios miss 30-50% of inquiries that arrive during shoots, events, or editing sessions", "Automated text-back within 30 seconds of a missed call: explains unavailability, captures budget and date, keeps lead warm", "Follow-up sequence: Day 2 portfolio link, Day 5 availability check, Day 10 booking link — fully automated", "The credibility angle: this system was built by a photographer who was losing jobs, not by an outside consultant", "Result: inquiry response time from hours to under 30 seconds. Lead falloff to competitors dropped significantly."]',
  '{"youtube_long": "We were losing wedding leads because inquiries came in during shoots and went unanswered for hours. Here is the automation we built — and what happened to our booking rate when we fixed the response time", "youtube_short": "Wedding photographer problem: missed call during a shoot. Here is the automation that fixed it.", "twitter": "Thread: Raj Photo Video was losing wedding leads during shoots because no one could pick up the phone. Here is the automation we built and the results after 60 days.", "instagram": "Lead calls during the ceremony. We cannot answer. They book someone else. Here is the system that ended that — and what it did to our bookings.", "substack": "The photography business automation playbook: how Raj Photo Video automated inquiry follow-up and stopped losing leads to competitors during shoots", "threads": "Wedding photographers: you are losing leads during shoots because you cannot answer the phone. Here is the fix."}',
  '["ops/packages/missed-call-text-back.md"]',
  'idea'
);

-- Raj Topic 2: Client gallery delivery automation
INSERT INTO content_bank (brand, topic_title, hook, talking_points, platform_angles, service_package_links, status) VALUES
(
  'raj_photo_video',
  'Automated Gallery Delivery: How We Cut Client Wait Time from 6 Weeks to 3 Weeks',
  'Gallery delivery is not just editing time — it is also the 4 hours per wedding spent on admin steps around delivery.',
  '["The hidden time cost: culling, selection, export, watermarking, uploading, notifying the client — each step manual, each step eating time", "Automated pipeline: AI-assisted culling reduces selection time by 60%, automated export and upload, client notification fires on delivery", "Client experience impact: faster delivery improves reviews and referrals — photography is word-of-mouth business", "The system: Gemini vision AI for hero selection scoring, automated export to Lightroom catalog, Google Drive or gallery platform upload, client email trigger", "Applicable to any photography or videography studio doing volume work: events, portraits, commercial"]',
  '{"youtube_long": "Raj Photo Video cut wedding gallery delivery time from 6 weeks to 3 weeks by automating the culling, export, upload, and client notification steps — here is every piece of the pipeline", "youtube_short": "Wedding gallery delivery: from 6 weeks to 3 weeks. Here is the pipeline.", "twitter": "Thread: gallery delivery was taking Raj Photo Video 6 weeks average. 4 of those weeks were editing. 2 were admin overhead. Here is what we automated.", "instagram": "6 weeks to deliver wedding galleries. 4 weeks was editing. 2 weeks was manual admin. Here is the automation that recovered those 2 weeks.", "substack": "The photography delivery pipeline: how AI-assisted culling, automated export, and trigger-based client notification cut delivery time by a third", "threads": "Wedding photographers: your delivery timeline is probably longer than it should be because of manual admin steps around the editing. Here is what those look like automated."}',
  '[]',
  'idea'
);

-- Raj Topic 3: Video production pipeline automation
INSERT INTO content_bank (brand, topic_title, hook, talking_points, platform_angles, service_package_links, status) VALUES
(
  'raj_photo_video',
  'The Video Production Pipeline That Runs Without Constant Manual Intervention',
  'Wedding videography: filming, culling, editing, color, audio, export, upload, delivery. Every step used to be a manual handoff.',
  '["Video production workflow: 15+ distinct steps from raw footage to delivered video, most of them manual handoffs between stages", "Automated pipeline: Cloud Run microservices handle ffmpeg processing, scene detection, clip extraction, export formatting", "Status visibility: Slack notifications at each stage so the team knows where every project is without asking", "Client delivery: automated Vimeo upload with privacy settings, client notification email with viewing link", "The compound benefit: fewer status check interruptions during editing = more time in deep focus work = better output"]',
  '{"youtube_long": "We built a video production pipeline for Raj Photo Video that automates the handoffs between every stage — Cloud Run, ffmpeg, scene detection, Vimeo upload, client notification. Here is how it works end-to-end.", "youtube_short": "Wedding videography pipeline: here is what automation looks like in a production studio", "twitter": "Thread: video production is 50% editing and 50% manual handoffs between stages. We automated the handoffs at Raj Photo Video. Here is what that pipeline looks like.", "instagram": "15 steps from raw footage to delivered video. Most of them were manual handoffs. Here is what we automated and what changed.", "substack": "Building a video production pipeline on Cloud Run: the technical architecture behind Raj Photo Video automated processing workflow — ffmpeg, scene detection, Vimeo delivery", "threads": "Every manual handoff in your production workflow is a place where time gets lost. Here is the Raj Photo Video pipeline after we automated them."}',
  '[]',
  'idea'
);
