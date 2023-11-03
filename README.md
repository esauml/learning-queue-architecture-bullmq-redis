# Job Queue Service using Redis Queue and Kuejs


<!-- create a mermaid graph having a load balancer then two servers -->
<!-- Those server are job producers. Behind then it should exists a job server (Kuejs) using a Redis DB -->
<!-- There should be two Job Consumers that connect to the Job server -->


<!-- add several users connecting to the upfront server -->
```mermaid
graph LR
    subgraph ArrayServer
    LB[Load Balancer] --> S1[Server 1]
    DB
    LB --> S2[Server 2]
    S1 --- DB[(DB)]
    S2 --- DB
    end

    subgraph JobsQueue
    S1 --->|produces| R[(Redis)]
    S2 --->|produces| R
    end

    subgraph WorkersArray
    R -->|consumes| JC1[Worker 1]
    R -->|consumes| JC2[Worker 2]
    end

    subgraph Users
    U1[fas:fa-user User 1] --> LB
    U2[fas:fa-user User 2] --> LB
    U3[fas:fa-user User 3] --> LB
    U4[fas:fa-user x100 Users] --> LB
    end
```
