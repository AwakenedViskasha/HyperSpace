---
name: Intervention Template
about: This template reports the status of Intervention.
title: "[F999] Feature title"
labels: ''
assignees: ''

---

### Description 

> (Describe what is what is the problem, what is gonna be done, explain roughly what  will be done and how it should be helping)

I am PlaceHolder of Description. The lambda module is too slow. Too much request is being adressed to the lambda module. This intervention will add a memoization function. It should reduce the number of requests.

### Workflow

> This section report the current progression of the intervention. The progression has three Phase.
> - Story phase : tell how things will works after the intervention or the ideal functioning of the mod.
> - Implementation phase : list the interventions needed on module and relate them to the story and report on the progress of the implementation
> -  Integration phase : report and plan the progress of integration of modifications into the main branch.
> 
> Each Phase go through different stage :
> - [] : nothing has been done yet about that phase.
> - [A] : phase has been Assigned to someone.
> - [A.I] : phase is In progress
> - [A.I.R] : phase has been reviewed.
> - [A.I.R.A]  : phase has been reviewed, accepted and is now done.


- [A.I.R.A] Story
- [] Implementation  Backlog
- [] Integration

### Story

>Tell how thin should be working and and list the different situations and behaviors. Try to use the correct nomenclature : ["issueIDCode"-S"SituationNumber"]

-  [F1-S1] When an HyperSpace receive a request, the HyperSpace will check its Memoization Module.
-  [F1-S2] IF the Memoization Module has a similar quest saved it will return what was the response of that request if the request was responded a certain amount of time before. 
-  [F1-S3] IF the Memoization Module does not have the request saved or if the request is too old, the HyperSpace will do the request.
- [F1-S4] If the request is succesful, the Module will save the request and result.

### Implementation Backlog
> List and describe the different interventions. Use same A.I.R.A nomenclature. Try to use the correct nomenclature : ["issueIDCode"-S"SituationNumber"-I"InterventionNumber"]

- [A]  [F1-S1-I1] .....
- [A]  [F1-S1-I2] .....
- [A]  [F1-S2-I1] .....

### Integration 
> report integration.

- Pending since **/**/**
- Reviewed by mr ****, the **/**/** : accepted/refused (link to post of refusal)
- Planned for the version *.*.*
- Done in  version *.*.* the **/**/**
