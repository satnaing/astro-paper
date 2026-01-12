---
title: "Satoshi Nakamoto annonce the creation of Bitcoin. This is how it started."
tags:
  - untagged
date_created: 2018-04-25
author: "Pascal Andy"
description: "no_description"
---
## Re: Bitcoin P2P e-cash paper

### Satoshi Nakamoto Sat, 01 Nov 2008 16:16:33 -0700

I've been working on a new electronic cash system that's fully

peer-to-peer, with no trusted third party.

The paper is available at:

<http://www.bitcoin.org/bitcoin.pdf>

The main properties:

Double-spending is prevented with a peer-to-peer network.

No mint or other trusted parties.

Participants can be anonymous.

New coins are made from Hashcash style proof-of-work.

The proof-of-work for new coin generation also powers the

network to prevent double-spending.

Bitcoin: A Peer-to-Peer Electronic Cash System

Abstract. A purely peer-to-peer version of electronic cash would

allow online payments to be sent directly from one party to another

without the burdens of going through a financial institution.

Digital signatures provide part of the solution, but the main

benefits are lost if a trusted party is still required to prevent

double-spending. We propose a solution to the double-spending

problem using a peer-to-peer network. The network timestamps

transactions by hashing them into an ongoing chain of hash-based

proof-of-work, forming a record that cannot be changed without

redoing the proof-of-work. The longest chain not only serves as

proof of the sequence of events witnessed, but proof that it came

from the largest pool of CPU power. As long as honest nodes control

the most CPU power on the network, they can generate the longest

chain and outpace any attackers. The network itself requires

minimal structure. Messages are broadcasted on a best effort basis,

and nodes can leave and rejoin the network at will, accepting the

longest proof-of-work chain as proof of what happened while they

were gone.

Full paper at:

<http://www.bitcoin.org/bitcoin.pdf>

Satoshi Nakamoto

* * *

The Cryptography Mailing List

Unsubscribe by sending "unsubscribe cryptography" to [EMAIL PROTECTED]

### James A. Donald Sun, 02 Nov 2008 17:55:45 -0800

Satoshi Nakamoto wrote:

[code]

I've been working on a new electronic cash system that's fully

peer-to-peer, with no trusted third party.

The paper is available at:

http://www.bitcoin.org/bitcoin.pdf

[/code]

We very, very much need such a system, but the way I understand your proposal, it does not seem to scale to the required size.

For transferable proof of work tokens to have value, they must have monetary value. To have monetary value, they must be transferred within a very large network - for example a file trading network akin to bittorrent.

To detect and reject a double spending event in a timely manner, one must have most past transactions of the coins in the transaction, which, naively implemented, requires each peer to have most past transactions, or most past transactions that occurred recently. If hundreds of millions of people are doing transactions, that is a lot of bandwidth - each must know all, or a substantial part thereof.

* * *

The Cryptography Mailing List

Unsubscribe by sending "unsubscribe cryptography" to [EMAIL PROTECTED]

### Satoshi Nakamoto Sun, 02 Nov 2008 17:56:27 -0800

Long before the network gets anywhere near as large as that, it would be safe

for users to use Simplified Payment Verification (section 8) to check for

double spending, which only requires having the chain of block headers, or

about 12KB per day. Only people trying to create new coins would need to run

network nodes. At first, most users would run network nodes, but as the

network grows beyond a certain point, it would be left more and more to

specialists with server farms of specialized hardware. A server farm would

only need to have one node on the network and the rest of the LAN connects with

that one node.

The bandwidth might not be as prohibitive as you think. A typical transaction

would be about 400 bytes (ECC is nicely compact). Each transaction has to be

broadcast twice, so lets say 1KB per transaction. Visa processed 37 billion

transactions in FY2008, or an average of 100 million transactions per day.

That many transactions would take 100GB of bandwidth, or the size of 12 DVD or

2 HD quality movies, or about $18 worth of bandwidth at current prices.

If the network were to get that big, it would take several years, and by then,

sending 2 HD movies over the Internet would probably not seem like a big deal.

Satoshi Nakamoto

* * *

The Cryptography Mailing List

Unsubscribe by sending "unsubscribe cryptography" to [EMAIL PROTECTED]

## Satoshi Nakamoto Mon, 03 Nov 2008 11:45:58 -0800

> > As long as honest nodes control the most CPU power on the network,
>  they can generate the longest chain and outpace any attackers.
>
> But they don't. Bad guys routinely control zombie farms of 100,000
>  machines or more. People I know who run a blacklist of spam sending
>  zombies tell me they often see a million new zombies a day.
>
> This is the same reason that hashcash can't work on today's Internet
>  \-- the good guys have vastly less computational firepower than the bad
>  guys.

Thanks for bringing up that point.

I didn't really make that statement as strong as I could have. The requirement

is that the good guys collectively have more CPU power than any single

attacker.

There would be many smaller zombie farms that are not big enough to overpower

the network, and they could still make money by generating bitcoins. The

smaller farms are then the "honest nodes". (I need a better term than

"honest") The more smaller farms resort to generating bitcoins, the higher the

bar gets to overpower the network, making larger farms also too small to

overpower it so that they may as well generate bitcoins too. According to the

"long tail" theory, the small, medium and merely large farms put together

should add up to a lot more than the biggest zombie farm.

Even if a bad guy does overpower the network, it's not like he's instantly

rich. All he can accomplish is to take back money he himself spent, like

bouncing a check. To exploit it, he would have to buy something from a

merchant, wait till it ships, then overpower the network and try to take his

money back. I don't think he could make as much money trying to pull a carding

scheme like that as he could by generating bitcoins. With a zombie farm that

big, he could generate more bitcoins than everyone else combined.

The Bitcoin network might actually reduce spam by diverting zombie farms to

generating bitcoins instead.

Satoshi Nakamoto

* * *

The Cryptography Mailing List

Unsubscribe by sending "unsubscribe cryptography" to [EMAIL PROTECTED]

## Satoshi Nakamoto Fri, 07 Nov 2008 09:30:36 -0800

> [Lengthy exposition of vulnerability of a systm to use-of-force
>  monopolies ellided.]
>
> You will not find a solution to political problems in cryptography.

Yes, but we can win a major battle in the arms race and gain a new territory of

freedom for several years.

Governments are good at cutting off the heads of a centrally controlled

networks like Napster, but pure P2P networks like Gnutella and Tor seem to be

holding their own.

Satoshi

## Satoshi Nakamoto Sat, 08 Nov 2008 13:38:26 -0800

Ray Dillinger:

> the "currency" is inflationary at about 35%
>  as that's how much faster computers get annually
>  ... the inflation rate of 35% is almost guaranteed
>  by the technology

Increasing hardware speed is handled: "To compensate for increasing hardware

speed and varying interest in running nodes over time, the proof-of-work

difficulty is determined by a moving average targeting an average number of

blocks per hour. If they're generated too fast, the difficulty increases."

As computers get faster and the total computing power applied to creating

bitcoins increases, the difficulty increases proportionally to keep the total

new production constant. Thus, it is known in advance how many new bitcoins

will be created every year in the future.

The fact that new coins are produced means the money supply increases by a

planned amount, but this does not necessarily result in inflation. If the

supply of money increases at the same rate that the number of people using it

increases, prices remain stable. If it does not increase as fast as demand,

there will be deflation and early holders of money will see its value increase.

Coins have to get initially distributed somehow, and a constant rate seems like

the best formula.

Satoshi Nakamoto

* * *

The Cryptography Mailing List

Unsubscribe by sending "unsubscribe cryptography" to [EMAIL PROTECTED]

## Satoshi Nakamoto Sun, 09 Nov 2008 11:13:34 -0800

Hal Finney wrote:

> it is mentioned that if a broadcast transaction does not reach all nodes,
>  it is OK, as it will get into the block chain before long. How does this
>  happen - what if the node that creates the "next" block (the first node
>  to find the hashcash collision) did not hear about the transaction,
>  and then a few more blocks get added also by nodes that did not hear
>  about that transaction? Do all the nodes that did hear it keep that
>  transaction around, hoping to incorporate it into a block once they get
>  lucky enough to be the one which finds the next collision?

Right, nodes keep transactions in their working set until they get into a

block. If a transaction reaches 90% of nodes, then each time a new block is

found, it has a 90% chance of being in it.

> Or for example, what if a node is keeping two or more chains around as
>  it waits to see which grows fastest, and a block comes in for chain A
>  which would include a double-spend of a coin that is in chain B? Is that
>  checked for or not? (This might happen if someone double-spent and two
>  different sets of nodes heard about the two different transactions with
>  the same coin.)

That does not need to be checked for. The transaction in whichever branch ends

up getting ahead becomes the valid one, the other is invalid. If someone tries

to double spend like that, one and only one spend will always become valid, the

others invalid.

Receivers of transactions will normally need to hold transactions for perhaps

an hour or more to allow time for this kind of possibility to be resolved.

They can still re-spend the coins immediately, but they should wait before

taking an action such as shipping goods.

> I also don't understand exactly how double-spending, or cancelling
>  transactions, is accomplished by a superior attacker who is able to muster
>  more computing power than all the honest participants. I see that he can
>  create new blocks and add them to create the longest chain, but how can
>  he erase or add old transactions in the chain? As the attacker sends out
>  his new blocks, aren't there consistency checks which honest nodes can
>  perform, to make sure that nothing got erased? More explanation of this
>  attack would be helpful, in order to judge the gains to an attacker from
>  this, versus simply using his computing power to mint new coins honestly.

The attacker isn't adding blocks to the end. He has to go back and redo the

block his transaction is in and all the blocks after it, as well as any new

blocks the network keeps adding to the end while he's doing that. He's

rewriting history. Once his branch is longer, it becomes the new valid one.

This touches on a key point. Even though everyone present may see the

shenanigans going on, there's no way to take advantage of that fact.

It is strictly necessary that the longest chain is always considered the valid

one. Nodes that were present may remember that one branch was there first and

got replaced by another, but there would be no way for them to convince those

who were not present of this. We can't have subfactions of nodes that cling to

one branch that they think was first, others that saw another branch first, and

others that joined later and never saw what happened. The CPU power

proof-of-work vote must have the final say. The only way for everyone to stay

on the same page is to believe that the longest chain is always the valid one,

no matter what.

> As far as the spending transactions, what checks does the recipient of a
>  coin have to perform? Does she need to go back through the coin's entire
>  history of transfers, and make sure that every transaction on the list is
>  indeed linked into the "timestamp" block chain? Or can she just do the
>  latest one?

The recipient just needs to verify it back to a depth that is sufficiently far

back in the block chain, which will often only require a depth of 2

transactions. All transactions before that can be discarded.

> Do the timestamp nodes check transactions, making sure that
>  the previous transaction on a coin is in the chain, thereby enforcing
>  the rule that all transactions in the chain represent valid coins?

Right, exactly. When a node receives a block, it checks the signatures of

every transaction in it against previous transactions in blocks. Blocks can

only contain transactions that depend on valid transactions in previous blocks

or the same block. Transaction C could depend on transaction B in the same

block and B depends on transaction A in an earlier block.

> Sorry about all the questions, but as I said this does seem to be a
>  very promising and original idea, and I am looking forward to seeing
>  how the concept is further developed. It would be helpful to see a more
>  process oriented description of the idea, with concrete details of the
>  data structures for the various objects (coins, blocks, transactions),
>  the data which is included in messages, and algorithmic descriptions
>  of the procedures for handling the various events which would occur in
>  this system. You mentioned that you are working on an implementation,
>  but I think a more formal, text description of the system would be a
>  helpful next step.

I appreciate your questions. I actually did this kind of backwards. I had to

write all the code before I could convince myself that I could solve every

problem, then I wrote the paper. I think I will be able to release the code

sooner than I could write a detailed spec. You're already right about most of

your assumptions where you filled in the blanks.

Satoshi Nakamoto

* * *

The Cryptography Mailing List

Unsubscribe by sending "unsubscribe cryptography" to [EMAIL PROTECTED]

## Satoshi Nakamoto Sun, 09 Nov 2008 11:17:24 -0800

James A. Donald wrote:

> OK, suppose one node incorporates a bunch of
>  transactions in its proof of work, all of them honest
>  legitimate single spends and another node incorporates a
>  different bunch of transactions in its proof of
>  work, all of them equally honest legitimate single
>  spends, and both proofs are generated at about the same
>  time.
>
> What happens then?

They both broadcast their blocks. All nodes receive them and keep both, but

only work on the one they received first. We'll suppose exactly half received

one first, half the other.

In a short time, all the transactions will finish propagating so that everyone

has the full set. The nodes working on each side will be trying to add the

transactions that are missing from their side. When the next proof-of-work is

found, whichever previous block that node was working on, that branch becomes

longer and the tie is broken. Whichever side it is, the new block will contain

the other half of the transactions, so in either case, the branch will contain

all transactions. Even in the unlikely event that a split happened twice in a

row, both sides of the second split would contain the full set of transactions

anyway.

It's not a problem if transactions have to wait one or a few extra cycles to

get into a block.

Satoshi Nakamoto

* * *

The Cryptography Mailing List

Unsubscribe by sending "unsubscribe cryptography" to [EMAIL PROTECTED]

## Satoshi Nakamoto Sun, 09 Nov 2008 11:14:17 -0800

James A. Donald wrote:

> The core concept is that lots of entities keep complete and consistent
>  information as to who owns which bitcoins.
>
> But maintaining consistency is tricky. It is not clear to me what
>  happens when someone reports one transaction to one maintainer, and
>  someone else transports another transaction to another maintainer. The
>  transaction cannot be known to be valid until it has been incorporated
>  into a globally shared view of all past transactions, and no one can
>  know that a globally shared view of all past transactions is globally
>  shared until after some time has passed, and after many new
>  transactions have arrived.
>
> Did you explain how to do this, and it just passed over my head, or
>  were you confident it could be done, and a bit vague as to the details?

The proof-of-work chain is the solution to the synchronisation problem, and to

knowing what the globally shared view is without having to trust anyone.

A transaction will quickly propagate throughout the network, so if two versions

of the same transaction were reported at close to the same time, the one with

the head start would have a big advantage in reaching many more nodes first.

Nodes will only accept the first one they see, refusing the second one to

arrive, so the earlier transaction would have many more nodes working on

incorporating it into the next proof-of-work. In effect, each node votes for

its viewpoint of which transaction it saw first by including it in its

proof-of-work effort.

If the transactions did come at exactly the same time and there was an even

split, it's a toss up based on which gets into a proof-of-work first, and that

decides which is valid.

When a node finds a proof-of-work, the new block is propagated throughout the

network and everyone adds it to the chain and starts working on the next block

after it. Any nodes that had the other transaction will stop trying to include

it in a block, since it's now invalid according to the accepted chain.

The proof-of-work chain is itself self-evident proof that it came from the

globally shared view. Only the majority of the network together has enough CPU

power to generate such a difficult chain of proof-of-work. Any user, upon

receiving the proof-of-work chain, can see what the majority of the network has

approved. Once a transaction is hashed into a link that's a few links back in

the chain, it is firmly etched into the global history.

Satoshi Nakamoto

* * *

The Cryptography Mailing List

Unsubscribe by sending "unsubscribe cryptography" to [EMAIL PROTECTED]

## Satoshi Nakamoto Mon, 10 Nov 2008 11:09:26 -0800

James A. Donald wrote:

> Furthermore, it cannot be made to work, as in the
>  proposed system the work of tracking who owns what coins
>  is paid for by seigniorage, which requires inflation.

If you're having trouble with the inflation issue, it's easy to tweak it for

transaction fees instead. It's as simple as this: let the output value from

any transaction be 1 cent less than the input value. Either the client

software automatically writes transactions for 1 cent more than the intended

payment value, or it could come out of the payee's side. The incentive value

when a node finds a proof-of-work for a block could be the total of the fees in

the block.

Satoshi Nakamoto

* * *

The Cryptography Mailing List

Unsubscribe by sending "unsubscribe cryptography" to [EMAIL PROTECTED]

## Satoshi Nakamoto Tue, 11 Nov 2008 06:30:22 -0800

James A. Donald wrote:

> So what happened to the coin that lost the race?
>
> ... it is a bit harsh if the guy who came second
>  is likely to lose his coin.

When there are multiple double-spent versions of the same transaction, one and

only one will become valid.

The receiver of a payment must wait an hour or so before believing that it's

valid. The network will resolve any possible double-spend races by then.

The guy who received the double-spend that became invalid never thought he had

it in the first place. His software would have shown the transaction go from

"unconfirmed" to "invalid". If necessary, the UI can be made to hide

transactions until they're sufficiently deep in the block chain.

> Further, your description of events implies restrictions
>  on timing and coin generation - that the entire network
>  generates coins slowly compared to the time required for
>  news of a new coin to flood the network

Sorry if I didn't make that clear. The target time between blocks will

probably be 10 minutes.

Every block includes its creation time. If the time is off by more than 36

hours, other nodes won't work on it. If the timespan over the last 6 _24_ 30

blocks is less than 15 days, blocks are being generated too fast and the

proof-of-work difficulty doubles. Everyone does the same calculation with the

same chain data, so they all get the same result at the same link in the chain.

> We want spenders to have certainty that their
>  transaction is valid at the time it takes a spend to
>  flood the network, not at the time it takes for branch
>  races to be resolved.

Instantant non-repudiability is not a feature, but it's still much faster than

existing systems. Paper cheques can bounce up to a week or two later. Credit

card transactions can be contested up to 60 to 180 days later. Bitcoin

transactions can be sufficiently irreversible in an hour or two.

> If one node is ignoring all spends that it does not
>  care about, it suffers no adverse consequences.

With the transaction fee based incentive system I recently posted, nodes would

have an incentive to include all the paying transactions they receive.

Satoshi Nakamoto

* * *

The Cryptography Mailing List

Unsubscribe by sending "unsubscribe cryptography" to [EMAIL PROTECTED]

## Satoshi Nakamoto Thu, 13 Nov 2008 19:34:25 -0800

James A. Donald wrote:

> It is not sufficient that everyone knows X. We also
>  need everyone to know that everyone knows X, and that
>  everyone knows that everyone knows that everyone knows X
>
>   - which, as in the Byzantine Generals problem, is the
>  classic hard problem of distributed data processing.
>

The proof-of-work chain is a solution to the Byzantine Generals' Problem. I'll

try to rephrase it in that context.

A number of Byzantine Generals each have a computer and want to attack the

King's wi-fi by brute forcing the password, which they've learned is a certain

number of characters in length. Once they stimulate the network to generate a

packet, they must crack the password within a limited time to break in and

erase the logs, otherwise they will be discovered and get in trouble. They

only have enough CPU power to crack it fast enough if a majority of them attack

at the same time.

They don't particularly care when the attack will be, just that they all agree.

It has been decided that anyone who feels like it will announce a time, and

whatever time is heard first will be the official attack time. The problem is

that the network is not instantaneous, and if two generals announce different

attack times at close to the same time, some may hear one first and others hear

the other first.

They use a proof-of-work chain to solve the problem. Once each general

receives whatever attack time he hears first, he sets his computer to solve an

extremely difficult proof-of-work problem that includes the attack time in its

hash. The proof-of-work is so difficult, it's expected to take 10 minutes of

them all working at once before one of them finds a solution. Once one of the

generals finds a proof-of-work, he broadcasts it to the network, and everyone

changes their current proof-of-work computation to include that proof-of-work

in the hash they're working on. If anyone was working on a different attack

time, they switch to this one, because its proof-of-work chain is now longer.

After two hours, one attack time should be hashed by a chain of 12

proofs-of-work. Every general, just by verifying the difficulty of the

proof-of-work chain, can estimate how much parallel CPU power per hour was

expended on it and see that it must have required the majority of the computers

to produce that much proof-of-work in the allotted time. They had to all have

seen it because the proof-of-work is proof that they worked on it. If the CPU

power exhibited by the proof-of-work chain is sufficient to crack the password,

they can safely attack at the agreed time.

The proof-of-work chain is how all the synchronisation, distributed database

and global view problems you've asked about are solved.

* * *

The Cryptography Mailing List

Unsubscribe by sending "unsubscribe cryptography" to [EMAIL PROTECTED]

## Satoshi Nakamoto Fri, 14 Nov 2008 14:29:22 -0800

Hal Finney wrote:

> I think it is necessary that nodes keep a separate
>  pending-transaction list associated with each candidate chain.
>  ... One might also ask ... how many candidate chains must
>  a given node keep track of at one time, on average?

Fortunately, it's only necessary to keep a pending-transaction pool for the

current best branch. When a new block arrives for the best branch,

ConnectBlock removes the block's transactions from the pending-tx pool. If a

different branch becomes longer, it calls DisconnectBlock on the main branch

down to the fork, returning the block transactions to the pending-tx pool, and

calls ConnectBlock on the new branch, sopping back up any transactions that

were in both branches. It's expected that reorgs like this would be rare and

shallow.

With this optimisation, candidate branches are not really any burden. They

just sit on the disk and don't require attention unless they ever become the

main chain.

> Or as James raised earlier, if the network broadcast
>  is reliable but depends on a potentially slow flooding
>  algorithm, how does that impact performance?

Broadcasts will probably be almost completely reliable. TCP transmissions are

rarely ever dropped these days, and the broadcast protocol has a retry

mechanism to get the data from other nodes after a while. If broadcasts turn

out to be slower in practice than expected, the target time between blocks may

have to be increased to avoid wasting resources. We want blocks to usually

propagate in much less time than it takes to generate them, otherwise nodes

would spend too much time working on obsolete blocks.

I'm planning to run an automated test with computers randomly sending payments

to each other and randomly dropping packets.

>   3. The bitcoin system turns out to be socially useful and valuable, so
>  that node operators feel that they are making a beneficial contribution
>  to the world by their efforts (similar to the various "@Home" compute
>  projects where people volunteer their compute resources for good causes).
>

>
> In this case it seems to me that simple altruism can suffice to keep the
>  network running properly.

It's very attractive to the libertarian viewpoint if we can explain it

properly. I'm better with code than with words though.

Satoshi Nakamoto

* * *

The Cryptography Mailing List

Unsubscribe by sending "unsubscribe cryptography" to [EMAIL PROTECTED]

## Satoshi Nakamoto Mon, 17 Nov 2008 09:04:47 -0800

I'll try and hurry up and release the sourcecode as soon as possible to serve

as a reference to help clear up all these implementation questions.

Ray Dillinger (Bear) wrote:

> When a coin is spent, the buyer and seller digitally sign a (blinded)
>  transaction record.

Only the buyer signs, and there's no blinding.

> If someone double spends, then the transaction record
>  can be unblinded revealing the identity of the cheater.

Identities are not used, and there's no reliance on recourse. It's all

prevention.

> This is done via a fairly standard cut-and-choose
>  algorithm where the buyer responds to several challenges
>  with secret shares

No challenges or secret shares. A basic transaction is just what you see in

the figure in section 2. A signature (of the buyer) satisfying the public key

of the previous transaction, and a new public key (of the seller) that must be

satisfied to spend it the next time.

> They may also receive chains as long as the one they're trying to
>  extend while they work, in which the last few "links" are links
>  that are _not_ in common with the chain on which they're working.
>  These they ignore.

Right, if it's equal in length, ties are broken by keeping the earliest one

received.

> If it contains a double spend, then they create a "transaction"
>  which is a proof of double spending, add it to their pool A,
>  broadcast it, and continue work.

There's no need for reporting of "proof of double spending" like that. If the

same chain contains both spends, then the block is invalid and rejected.

Same if a block didn't have enough proof-of-work. That block is invalid and

rejected. There's no need to circulate a report about it. Every node could

see that and reject it before relaying it.

If there are two competing chains, each containing a different version of the

same transaction, with one trying to give money to one person and the other

trying to give the same money to someone else, resolving which of the spends is

valid is what the whole proof-of-work chain is about.

We're not "on the lookout" for double spends to sound the alarm and catch the

cheater. We merely adjudicate which one of the spends is valid. Receivers of

transactions must wait a few blocks to make sure that resolution has had time

to complete. Would be cheaters can try and simultaneously double-spend all

they want, and all they accomplish is that within a few blocks, one of the

spends becomes valid and the others become invalid. Any later double-spends

are immediately rejected once there's already a spend in the main chain.

Even if an earlier spend wasn't in the chain yet, if it was already in all the

nodes' pools, then the second spend would be turned away by all those nodes

that already have the first spend.

> If the new chain is accepted, then they give up on adding their
>  current link, dump all the transactions from pool L back into pool
>  A (along with transactions they've received or created since
>  starting work), eliminate from pool A those transaction records
>  which are already part of a link in the new chain, and start work
>  again trying to extend the new chain.

Right. They also refresh whenever a new transaction comes in, so L pretty much

contains everything in A all the time.

> CPU-intensive digital signature algorithm to
>  sign the chain including the new block L.

It's a Hashcash style SHA-256 proof-of-work (partial pre-image of zero), not a

signature.

> Is there a mechanism to make sure that the "chain" does not consist
>  solely of links added by just the 3 or 4 fastest nodes? 'Cause a
>  broadcast transaction record could easily miss those 3 or 4 nodes
>  and if it does, and those nodes continue to dominate the chain, the
>  transaction might never get added.

If you're thinking of it as a CPU-intensive digital signing, then you may be

thinking of a race to finish a long operation first and the fastest always

winning.

The proof-of-work is a Hashcash style SHA-256 collision finding. It's a

memoryless process where you do millions of hashes a second, with a small

chance of finding one each time. The 3 or 4 fastest nodes' dominance would

only be proportional to their share of the total CPU power. Anyone's chance of

finding a solution at any time is proportional to their CPU power.

There will be transaction fees, so nodes will have an incentive to receive and

include all the transactions they can. Nodes will eventually be compensated by

transaction fees alone when the total coins created hits the pre-determined

ceiling.

> Also, the work requirement for adding a link to the chain should
>  vary (again exponentially) with the number of links added to that
>  chain in the previous week, causing the rate of coin generation
>  (and therefore inflation) to be strictly controlled.

Right.

> You need coin aggregation for this to scale. There needs to be
>  a "provable" transaction where someone retires ten single coins
>  and creates a new coin with denomination ten, etc.

Every transaction is one of these. Section 9, Combining and Splitting Value.

Satoshi Nakamoto

* * *

The Cryptography Mailing List

Unsubscribe by sending "unsubscribe cryptography" to [EMAIL PROTECTED]

## Satoshi Nakamoto Mon, 17 Nov 2008 09:06:02 -0800

to be continued ...

* * *

The Cryptography Mailing List

Unsubscribe by sending "unsubscribe cryptography" to [EMAIL PROTECTED]

## Title

ksksksks

* * *

The Cryptography Mailing List

Unsubscribe by sending "unsubscribe cryptography" to [EMAIL PROTECTED]

## Title

ksksksks

* * *

The Cryptography Mailing List

Unsubscribe by sending "unsubscribe cryptography" to [EMAIL PROTECTED]

## Title

ksksksks

* * *

The Cryptography Mailing List

Unsubscribe by sending "unsubscribe cryptography" to [EMAIL PROTECTED]

## Title

ksksksks

* * *

The Cryptography Mailing List

Unsubscribe by sending "unsubscribe cryptography" to [EMAIL PROTECTED]

## Sources

Pascal here. I wanted to copy those message on my blog as this was the [only source](https://www.mail-archive.com/search?l=cryptography@metzdowd.com&q=from:%22Satoshi+Nakamoto%22) I found about those conversations.

<https://www.mail-archive.com> is not decentralized right? Nor is my blog I have to admit. Cheers!