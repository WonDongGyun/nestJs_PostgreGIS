# ๐ ์ง๋ ํฌ์ธํธ, ํฌ์ธํธ ๊ทธ๋ฃน ์ ์ฅ ์กฐํ ํ๋ก์ ํธ 

<br/>
<br/>

๐ฎ ํด๋น ํ๋ก์ ํธ์ ๊ธฐ๋ฅ
-------------  

- ์ง๋ฆฌ์ ๋ณด์ธ Point ์ ๋ณด๋ฅผ ์ ์ฅ, ์กฐํํ๋ ๊ธฐ๋ฅ์ ๊ฐ๋ ์๋ฒ๋ฅผ ๋ง๋๋ ํ๋ก์ ํธ์๋๋ค.  
- API๋ graphql๋ฅผ ์ฌ์ฉํ์ฌ ๊ตฌํํ์์ต๋๋ค.
- n + 1 ๋ฌธ์ ๋ฅผ ์ฝ๊ฒ ๋ณด๊ธฐ ์ํ ์ฃผ์ ๋ฐ ์ฝ๋๊ฐ ์กด์ฌํฉ๋๋ค.

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

๐คญ ์ด๋ฒ ํ๋ก์ ํธ๋ฅผ ํ๋ฉฐ ์๋กญ๊ฒ ๋ฐฐ์ด ๊ฒ
-----------------
1.  graphql (scalar, query, mutation ...)
2.  graphql N + 1 problem ๋ฐ Dataloader
3.  postgreSql ๋ฐ postgis

<br/>
<br/>

๐ญ ์ด๋ ค์ ๋ ์ 
-----------------
1.  graphql Scalar ์ ์
2.  graphql N + 1 problem ํด๊ฒฐํ๊ธฐ ๋ฐ Dataloader ์ฌ์ฉํ๊ธฐ
3.  postgreSql ์ค์  ๋ฐ postgis ST_SetSRID, ST_DWithin ์ฌ์ฉํ๊ธฐ

<br/>
<br/>
