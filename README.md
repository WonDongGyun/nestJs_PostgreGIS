# 🌍 지도 포인트, 포인트 그룹 저장 조회 프로젝트 

<br/>
<br/>

🎮 조건  
-------------  

- 지리정보인 Point 정보를 저장, 조회하는 기능을 갖는 서버를 만드는 프로젝트입니다.  
- API는 graphql로 구현되어야 합니다.  
- typescript, nestjs, nestjs/graphql, typeorm으로 구현하세요. (필요에 따라 다른 패키지들을 얼마든지 추가해도 됩니다.)  
- typeorm의 synchronize 옵션은 true로 해도 괜찮습니다.  
- DB는 postgresql에 postgis extension을 설치하여 사용하세요.
- Location 테이블의 coordinate의 DB 필드 타입은 반드시 postgis의 geometry 타입, srid = 4326으로 만드세요.  
- 지리정보는 반드시 GeoJSON 형식으로 다루세요.   

<br/>
<br/>

## Query

### locationGroup

<p align="center"><img src="https://user-images.githubusercontent.com/52685665/122650519-6ff70700-d16e-11eb-978c-60b69b25dc69.png"></p>

### location

<p align="center"><img src="https://user-images.githubusercontent.com/52685665/122650656-2c50cd00-d16f-11eb-84d7-578ad8f084a5.png"></p>

### locationGroups

<p align="center"><img src="https://user-images.githubusercontent.com/52685665/122650633-0aefe100-d16f-11eb-8d56-6ccbed90ba0c.png"></p>

### locationFromCenter

<p align="center"><img src="https://user-images.githubusercontent.com/52685665/122650717-7043d200-d16f-11eb-8171-74b58d60aefd.png"></p>

### Dataloader

<p align="center"><img src="https://user-images.githubusercontent.com/52685665/122651868-9325b480-d176-11eb-976f-05303236d84a.png"></p>

<p align="center"><img src="https://user-images.githubusercontent.com/52685665/122651900-b2244680-d176-11eb-94e3-edd951c53802.png"></p>

<br/>
<br/>

## Mutation

### createLocationGroup

<p align="center"><img src="https://user-images.githubusercontent.com/52685665/122650759-99fcf900-d16f-11eb-9674-ea116c22414d.png"></p>

### createLocationGroup

<p align="center"><img src="https://user-images.githubusercontent.com/52685665/122650809-d6305980-d16f-11eb-84e1-26736b2d6170.png"></p>


<br/>
<br/>

🤭 이번 프로젝트를 하며 새롭게 배운 것
-----------------
1.  graphql (scalar, query, mutation ...)
2.  graphql N + 1 problem 및 Dataloader
3.  postgreSql 및 postgis

<br/>
<br/>

😭 어려웠던 점
-----------------
1.  graphql Scalar 정의
2.  graphql N + 1 problem 해결하기 및 Dataloader 사용하기
3.  postgreSql 설정 및 postgis ST_SetSRID, ST_DWithin 사용하기

<br/>
<br/>
