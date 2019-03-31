# Coding-Train-Pi-Day-Collisions

In all demos the computations only considered the beginning or the end of one frame. 
This may work well for games, but it can get incorrect numerically pretty fast.
(I was wondering that results stayed accurate, even if the squared overlapped by 1% of the big one for 7 digits)
This simulation wanted to preserve the aspect of a simulation, while considering collisions within one frame, 
instead of bumping up the computational steps within one frame or resetting positions. 
The improvement shows a more realistic result and faster computation when there is a moderate amount of collisions.
