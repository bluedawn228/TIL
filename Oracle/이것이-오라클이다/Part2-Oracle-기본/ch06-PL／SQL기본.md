# ch06 PL/SQL기본
## 6.1 SELECT문
실습2 : 앞으로 책의 전 과정에서 사용할 스키마(=사용자)와 테이블을 생성하자.  

**step0**  
sql developer을 종료하고 다시 실행하자. 
 
**step1**  
sqlDB 스키마(=사용자)를 만들자  
```sql
create user sqlDB identified by 1234
default tablespace users
temporary tablespace temp;

grant connect, resource, dba to sqlDB;
```

**step2**  
sqlDB접속을 만들자  

**step3,4**  
테이블을 만들고 데이터를 입력하자  
```sql
CREATE TABLE userTBL -- 회원 테이블
( userID  	CHAR(8) NOT NULL PRIMARY KEY, -- 사용자 아이디(PK)
  userName  	NVARCHAR2(10) NOT NULL, -- 이름
  birthYear 	NUMBER(4) NOT NULL,  -- 출생년도
  addr	  	NCHAR(2) NOT NULL, -- 지역(경기,서울,경남 식으로 2글자만입력)
  mobile1	CHAR(3), -- 휴대폰의 국번(010, 011, 016, 017, 018, 019 등)
  mobile2	CHAR(8), -- 휴대폰의 나머지 전화번호(하이픈제외)
  height    	NUMBER(3),  -- 키
  mDate    	DATE  -- 회원 가입일
);
CREATE TABLE buyTBL -- 회원 구매 테이블
(  idNum 	NUMBER(8) NOT NULL PRIMARY KEY, -- 순번(PK)
   userID  	CHAR(8) NOT NULL, -- 아이디(FK)
   prodName 	NCHAR(6) NOT NULL, --  물품명
   groupName 	NCHAR(4)  , -- 분류
   price     	NUMBER(8)  NOT NULL, -- 단가
   amount    	NUMBER(3)  NOT NULL, -- 수량
   FOREIGN KEY (userID) REFERENCES userTBL(userID)
);

INSERT INTO userTBL VALUES('LSG', '이승기', 1987, '서울', '011', '11111111', 182, '2008-8-8');
INSERT INTO userTBL VALUES('KBS', '김범수', 1979, '경남', '011', '22222222', 173, '2012-4-4');
INSERT INTO userTBL VALUES('KKH', '김경호', 1971, '전남', '019', '33333333', 177, '2007-7-7');
INSERT INTO userTBL VALUES('JYP', '조용필', 1950, '경기', '011', '44444444', 166, '2009-4-4');
INSERT INTO userTBL VALUES('SSK', '성시경', 1979, '서울', NULL  , NULL      , 186, '2013-12-12');
INSERT INTO userTBL VALUES('LJB', '임재범', 1963, '서울', '016', '66666666', 182, '2009-9-9');
INSERT INTO userTBL VALUES('YJS', '윤종신', 1969, '경남', NULL  , NULL      , 170, '2005-5-5');
INSERT INTO userTBL VALUES('EJW', '은지원', 1972, '경북', '011', '88888888', 174, '2014-3-3');
INSERT INTO userTBL VALUES('JKW', '조관우', 1965, '경기', '018', '99999999', 172, '2010-10-10');
INSERT INTO userTBL VALUES('BBK', '바비킴', 1973, '서울', '010', '00000000', 176, '2013-5-5');

CREATE SEQUENCE idSEQ; -- 순차번호 입력을 위해서 시퀀스 생성
INSERT INTO buyTBL VALUES(idSEQ.NEXTVAL, 'KBS', '운동화', NULL   , 30,   2);
INSERT INTO buyTBL VALUES(idSEQ.NEXTVAL, 'KBS', '노트북', '전자', 1000, 1);
INSERT INTO buyTBL VALUES(idSEQ.NEXTVAL, 'JYP', '모니터', '전자', 200,  1);
INSERT INTO buyTBL VALUES(idSEQ.NEXTVAL, 'BBK', '모니터', '전자', 200,  5);
INSERT INTO buyTBL VALUES(idSEQ.NEXTVAL, 'KBS', '청바지', '의류', 50,   3);
INSERT INTO buyTBL VALUES(idSEQ.NEXTVAL, 'BBK', '메모리', '전자', 80,  10);
INSERT INTO buyTBL VALUES(idSEQ.NEXTVAL, 'SSK', '책'    , '서적', 15,   5);
INSERT INTO buyTBL VALUES(idSEQ.NEXTVAL, 'EJW', '책'    , '서적', 15,   2);
INSERT INTO buyTBL VALUES(idSEQ.NEXTVAL, 'EJW', '청바지', '의류', 50,   1);
INSERT INTO buyTBL VALUES(idSEQ.NEXTVAL, 'BBK', '운동화', NULL   , 30,   2);
INSERT INTO buyTBL VALUES(idSEQ.NEXTVAL, 'EJW', '책'    , '서적', 15,   1);
INSERT INTO buyTBL VALUES(idSEQ.NEXTVAL, 'BBK', '운동화', NULL   , 30,   2);
```

**step5**  
입력한 데이터를 커밋하고 데이터를 확인하자.  
```sql
COMMIT;
SELECT * FROM userTBL;
SELECT * FROM buyTBL;
```

**step6**  
실수로 이 스키마가 변경되어도 다시 입력하는 번거로움이 없도록 sql문을 저장해 놓자. 지금 저장해 놓은 sqlDB.sql파일은 앞으로 이책에서 sqlDB를 `초기화`할때 사용할 것이다. 7장에서 다시 언급한다.  

## select
SELECT문을 실제적으로 요약한 구조는 다음과 같다.  
```
[WITH <Sub Query>]
SELECT select_list
[FROM table_source] [WHERE search_condition]
[GROUP BY group_by_expression]
[HAVING search_condition]
[ORDER BY order_expression [ ASC | DESC ]]
```
**명령문 실행 아이콘과 스크립트 출력 아이콘의 차이**  
명령문 실행 : 50개행 조회(설정에서 바꿀수 있음)  
스크립트 출력 : 모든행 조회(실제로 모든행은 아니고 어느 정도 제한은 있음)  

```sql
SELECT * FROM HR.employees;
```
원칙적으로는 위와같이 스키마 이름을 붙여줘야한다.  
```sql
select department_id, department_name from departments;
-- 주석
/*
블록주석
*/
```
여러개의 열을 가져온다  

HR.departments 테이블의 열이 무엇이 있는지 확인해보자
```sql
select * from sys.dba_tab_columns where owner = 'hr' and table_name = 'departments';
```
sys.dba_tab_columns(=sys.all_tab_columns)는 모든 테이블 목록의 열 정보가 들어잇는 sys 사용자의 뷰다.  

```sql
select department_id 부서번호, department_name as "부서 이름"
from hr.departments;
```
별칭(Alias)로 지정하고 싶다면 위처럼 뒤에 바로 붙여주든가 as를 쓰고 붙여준다  
 

## where
조건연산자(=, <, >, <=, >=, <>, != 등)와 관계 연산자(NOT, AND, OR 등)을 잘 조합하면 다양한 쿼리를 만들 수 있다.  

between ... and와 in()의 차이는 '연속적 vs 이산적' 이다.  
성능은 between을 안쓰고 그냥 비교연산자를 쓰는게 더 낫다  


문자열의 내용을 검색하기 위해서는 like연산자를 사용할 수 있다.  
```sql
where userName like '김%' -- 성이 김씨이고 그 뒤는 무엇이든(%)허용한다는 의미
```
즉 김이 제일 앞글자인 것들을 추출한다. '김'인 애들도 추출한다. 즉 %에 아무거도 안들어간 애들도 추출한다. _는 다르다. 무조건 한글자가 있어야한다? 그리고 한글자와 매치하기 위해서는 _를 사용한다. 다음은 맨 앞글자가 한글자이고 그다음이 '종신'인 사람을 조회해준다
```sql
where userName like '_종신';
```
이외에도 $와 _를 조합해서 사용할 수 있다. 조건에 _용%라고 사용하면 앞에 아무거나 한글자가 오고 두번째는 용, 세번째 이후에는 몇글자든 아무거나 오는 값을 추출해준다.  
주의 : %나 _가 검색할 문자열의 제일 앞에 들어가는 것은 Oracle 성능에 나쁜 영향을 끼칠 수 있다. 대용량 데이터를 사용할 경우에는 아주 비효율적인 결과를 낳게 된다.  


### ANY/ALL/SOME 그리고 서브쿼리(SubQuery, 하위쿼리)
서브쿼리란 간단히 얘기하면 쿼리문 안에 또 쿼리문이 들어잇는 것을 얘기한다.  
우리가 `김경호보다 키가 크거나 같은` 사람의 이름과 키를 출력하려면, where 조건에 `김경호의 키`를 직접 써줘야한다.
```sql
select userName, height 
    from userTBL 
where height > 177;
```
근데 이 177이라는 키를 직접 써주는게 아니라 이것도 쿼리를 통해서 사용하려는 것이다!  
```sql
select userName, height 
    from userTBL
where height > (select height from userTBL where userName = '김경호');
```
(select height from userTBL where userName = '김경호')는 177이라는 값을 돌려주므로 결국 177이라는 값과 동일한 값이 되어서 위 두 쿼리는 동일한 결과를 내주는 것이다.  

이번엔 지역이 경남 사람의 키보다 키가 크거나 같은 사람을 추출해보자.  
```sql
select userName, height from userTBL
where height >= (select height from userTBL where addr = '경남');
```
경남인 사람은 김범수(키 173), 윤종신(키 170)이므로 173 또는 170보다 작은 조용필을 제외한 나머지 9명이 출력되면 된다. 논리적으로 틀린 것은 없는 듯하지만, 오류가 나온다. 오류메시지를 보니 single-row subquery returns more than one row 즉 서브쿼리가 둘 이상의 값을 반환하기 때문이다. 그래서 필요한 구문이 any이다.  
```sql
any (select height from userTBL where addr = '경남');
```
예상한 대로 키가 173보다 크거나 같은 사람 또는 키가 170보다 크거나 같은 사람이 모두 출력될 것이다.  
이번에는 any를 all로 바꿔보자. 이건 and라고 생각하면 된다.  
참고로 some은 any와 동일한 의미로 사용된다.  
이번에는 >=any 대신 =any를 사용해보자  
그럼 김범수, 윤종신 2명이 출력된다. 정확히 any다음의 서브쿼리 결과와 동일한 값인 173, 170에 해당되는 사람만 출력되었다. 이는 다음과 동일한 구문이다. 즉 '=any(서브쿼리)'는 'in(서브쿼리)'와 동일한 의미이다.  
```sql
select userName, height from userTBL
where height in (select height from userTBL where addr = '경남');
```

### order by
order by는 정렬이다. order by는 where절과 같이 사용되어도 무방하다. 그리고 order by절은 select, from, where, group by, havinng, order by 중에서 제일 뒤에 와야한다는 것을 잊지말자  
주의 : order by절은 Oracle의 성능을 떨어뜨릴 소지가 있다. 꼭 필요한 경우가 아니라면 되도록 사용하지 않는 것이 좋다  

```sql
select userName, height from userTBL order by height desc, userName asc;
```
만약 키가 같은 경우에 이름순으로 출력하기 위해서 위와같이 했다. asc는 디폴트값이므로 생략해도 된다.  

### rownum열과 sample문
hire_date(회사 입사일)열이 있는데, 입사일이 오래된 직원 5명의 employee_id(사원 번호)를 알고 싶다면 어떻게 해야할까? order by를 사용하면 된다.  
참고 : 명령문 실행 또는 ctrl + enter 를 눌러서 실행하면 최대 50행만 조회된다. 만약 끝까지 조회하고 싶다면 [질의 결과]창에서 ctrl + end를 누르면 끝 행까지 조회된다  

```sql
select employee_id, hire_date from employees
order by hire_date asc;
```
이렇게 하면 쫙나오고, 제일 앞의 5건만 사용하면된다. 그런데 5건을 보기위해서 필요없는 모든 데이터를 출력하였다. 만약 상위의 N개만 출력하려면 `서브 쿼리와 'where rownum <= 개수'구문을 함께 사용`하면 된다. 다음 쿼리는 ctrl + enter나 f5아무거나 눌러서 실행해도 된다.  
```sql
select * from
(select employee_id, hire_date from employees order by hire_date asc) where rownum <= 5;
```
주의할 점은 지금 사용한 방식은 출력되는 결과만 5건을 보여 줄 뿐, Oracle의 성능에는 상당히 나쁜 영향을 미칠 수 있다는 것이다. 즉 107건이 아니라 107억 건일 경우라도 서브 쿼리에서 모든 데이터를 조회해서 정려한 후에, 5건만 가져오는 방식이다.  
참고 : 악성쿼리문이란 서버의 처리량을 많이 사용해서 결국 서버의 전반적인 성능를 나쁘게 하는 쿼리문을 뜻하다. 비유를 하자면 많은 사람(쿼리문)이 표를 끊기 위해서(처리되기위해서) 줄을 서 있는데, 어떤 사람(악성 쿼리문)이 계속 판매원에게 필요치 않은 질문을 던지는거다. 잘못된 악성쿼리를 자꾸 만들지 않도록 더욱 신경을 써서 sql문을 만들 필요가 있다. 9장 인덱스를 배우면서 자세히 살펴보자.  

앞의 방식은 입사일이 빠른 5명을 뽑아야 하기 때문에 Oracle의 성능저하를 무시하고, 어쩔수없이 사용했다. 만약 입사일에 관계없이 앞에서 5명을 뽑는다면 다음과 같이 사용하면 된다.  
```sql
select employee_id, hire_date from employees
where rownum <= 5;
```
그런데 위의 코드는 항상 테이블에 저장된 상위의 5건만 조회한다. 즉 조회할때마다 같은 데이커가 늘 반복되어 나옯올 수 밖에 없다. 만약, 임의의 데이터를 추출하고 싶다면 sample(퍼센트)을 사용하면된다. 퍼센트는 0초과 100미만의 값이어야 한다.  
```sql
select employee_id, hire_date from employees sample(5);
```
추출된 결과는 5건이 아닐 수도 있다. 전체 건수가 107건이므로 실행시마다 대략적으로 계산되어 5%의 데이터인 5건을 반환했다. 즉, 실행 시마다 다른 데이터가 반환되고 반환되는 행의 개수도 조금씩 다를 수 있다.  

### 테이블을 복사하는 create table ... as select
테이블을 복사해서 사용할 경우에 주로 사용된다.
```sql
create table 새로운 테이블 as (select 복사할 열 from 기존 테이블)
```
예
```sql
create table buyTBL2 as (select * from buyTBL);
select * from buyTBL2;
```
```sql
create table buyTBL3 as (select userID, prodName from buyTBL);
select * from buyTBL3;
```
그런데 buyTBL은 primary key 및 foreign key가 지정되어 있다. 그것들도 복사가 될까? sql developer의 접속에서 로컬-sqlDB >> 테이블(필터링됨) >> BUYTBL 및 BUYTBL2에서 마우스 오른쪽 버튼을 클릭한 후 편집을 선택해서 테이블 편집 화면을 확인해 보자. 제약조건 부분이 모두 비어잇는 것을 확인할 수 있다. 즉 PK나 FK 등의 제약 조건은 복사되지 않았다.  

## GROUP BY 및 HAVING 그리고 집계 함수
### GROUP BY 절
```sql
select select_expr
    [from table_reference]
    [where where_condition]
    [group by {col_userName|expr|position}]
    [having where_condition]
    [order by {col_userName|exper|position}]
```
말그대로 그룹으로 묶어주는 역할.  
```sql
select userID, amount from buyTBL order by userID;
```
합계를 내고 싶을때 집계함수(Aggregate Function)을 사용하면 된다. 집계함수는 일반적으로 Group by절과 함께 쓰이며 데이터를 그룹화(Grouping)해주는 기능을 한다.  
우리가 원하는 건 각 사용자별로 구매한 개수를 합쳐서 출력하는 것이다. 집계함수 sum()과 group by절을 사용하면 된다. 즉 사용자 별로 group id로 묶어준 후에 sum()함수로 구매 개수를 합치면 된다.  
```sql
select userID, sum(amount) from buyTBL group by userID:
```
별칭도 이용하자.  
이번엔 구매액의 총합을 출력해보자  
```sql
select userID as "사용자 아이디", sum(price*amount) as "총 구매액"
from buyTBL group by userID;
```

### 집계 함수  
sum()외에 group by와 함께 자주 사용하는 집계함수(또는 집합함수)는 다음과 같다.  
참고 : 집계함수이외의 Oracle내장함수는 7장에서 확인해 본다  
```
avg()
min()
max()
count() : 행의 개수를 센다
count(ditinct)
stdev() : 표준편차를 구한다
variance() : 분산을 구한다
```
```sql
select avg(amount) from buyTBL;
```
2.91666666666가 나왔다. 소수점을 조절하고 싶으면 cast()를 사용하면 된다
```sql
select cast(avg(amount)) as number(5,3) from buyTBL;
```
그럼 2.917이 나온다  
cast()는 cast(숫자 as 변환할_형식)으로 사용한다. cast()의 사용법은 7장 데이터 형식을 학습한 후에 자세한 사용법을 알아보자  

```sql
select userName, max(height), min(height) from userTBL; -- 에러
/*
not a single-group group function
*/
```
group by 없이는 별도의 이름 열을 집계함수와 같이 사용할 수 없다는 메시지이다. 그래서 밑처럼 고쳐보자
```sql
select userName, max(height), min(height) from userTBL group by userName;
```
이러면 원하는 결과가 나오지 않는다. 이런 경우에는 앞에서 배운 서브쿼리와 조합을 하는 것이 제일 수월하다.  
```sql
select userName, height
from userTBL
where height = (select max(height) from userTBL)
    or height = (select min(height) from userTBL);
```
원하는 결과가 나온다
```sql
select count(*) from userTBL;
```
위 쿼리의 결과는 전체 회원 10명이 나온다. 휴대폰이 잇는 회원만 카운트하자. null값인 것을 제외하고 카운트를 한다.
```sql
select count(mobie1) from userTBL;
```

### Having 절
```sql
select userID, sum(price*amount) from buyTBL group by userID;
```
앞에서 했던 거처럼 사용자별 총 구매액을 구했다. 그런데 이중에서 총 구매액이 1000이상인 사용자에게만 사은품을 증정하고 싶다. 그럼 우리는 where문을 떠올릴 것이다.  
```sql
select userID, sum(price*amount)
from buyTBL
where sum(price*amount) > 100
group by userID
/*
에러
group function is not allowed here
*/
```
집계함수는 where 절에 나타날 수 없다는 뜻이다. 이럴때 사용되는 것이 having절이다. having은 where와 비슷한 개념으로 조건을 제한하는 것이지만, `집계함수에 대해서` 조건을 제한하는 것이라고 생각하면된다. 그리고 having절은 꼭 group by 절 다음에 나와야한다. 순서가 바뀌면 안된다.  
```sql
select userID, sum(price*amount)
from buyTBL
froupt by userID
having sum(price*amount) > 1000;
```
order by는 맨 뒤에 쓰자.  

### rollup(), grouping_id(), cube() 함수
부터 안했음.