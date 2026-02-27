# Monthly Reconciliation That Runs Itself

**Category:** Bookkeeping
**Result:** Full monthly bank reconciliation automated end-to-end, from transaction fetch to CPA-ready report

## The problem

Monthly reconciliation is one of those tasks every small business owner knows they should do but few actually finish on time. For a service business running transactions through a single Chase account, the process looks like this every month: log into the bank, export a statement, open QuickBooks, manually match transactions, clean up the "For Review" pile, fix miscategorized items, and eventually hand something to a CPA. The whole process takes 2 to 4 hours and gets skipped when things get busy.

The bigger problem is the "For Review" backlog. Left unaddressed, it compounds. 3 months of unreviewed transactions makes quarterly tax prep a nightmare.

## What I built

I built a system that pulls Chase bank transactions directly via Plaid, compares them against QuickBooks categorized transactions, and flags every discrepancy automatically. It clears the "For Review" queue using browser automation, analyzes the existing bank feed rules to find gaps, and suggests new rules to improve automatic categorization going forward. At the end of the run, it produces a formatted reconciliation report ready to hand to a CPA — no manual assembly required.

The whole workflow runs as a single command. What used to take an afternoon now takes the time it takes to make a coffee.

## The result

- Monthly reconciliation time cut from 2 to 4 hours to under 15 minutes of human review
- "For Review" backlog cleared automatically each cycle instead of accumulating
- Bank feed rules continuously optimized, increasing the percentage of transactions categorized correctly on first import
- CPA report generated automatically, eliminating manual report prep before each tax meeting
- Discrepancies flagged immediately rather than discovered weeks later

## Why this matters for your business

If you are a freelancer, photographer, contractor, or any sole proprietor running a service business, your bookkeeping situation probably looks exactly like this. The work is not complicated — it is just repetitive enough that it never feels worth doing until it has to be done. An automation like this pays for itself the first time it prevents a missed deduction or a panicked tax-season scramble.
