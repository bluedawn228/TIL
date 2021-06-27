```sql
select dname, 'it''s deptno : ', deptno "DNAME AND DEPTNO" from dept;
```
결과
```

DNAME          'IT''SDEPTNO:' DNAME AND DEPTNO
-------------- -------------- ----------------
ACCOUNTING     it's deptno :                10
RESEARCH       it's deptno :                20
SALES          it's deptno :                30
OPERATIONS     it's deptno :                40

```
```sql
select distinct job from emp; -- 중복컬럼제거
select distinct job, ename from emp; -- 두개컬럼을 묶어서 유니크한거처럼 생각하자
select job, distinct ename from emp; -- 당연히 불가능하다. 그래서 distinct는 항상 맨 앞에 써야한다
```

```sql
select first_name || ' ' || last_name from employees;
```
연결연산자이다. 위와같이 공백을 넣을 수 도 있다. 단순히 붙이는 것이다.  

### 연습문제
![image](https://user-images.githubusercontent.com/68311318/123189402-ba62e580-d4d8-11eb-921e-735121406123.png)   
```sql
select (name || '''s ID : ' || id || ', WEIGHT is ' || weight || 'kg') as "ID AND WEIGHT" from student;
```
''에 주의하자  

![image](https://user-images.githubusercontent.com/68311318/123190105-ed59a900-d4d9-11eb-913e-cd69e64aae6e.png)  
```sql
SELECT
    ( ename || '(' || job || ') , ' || ename || '''' || job || '''' ) "NAME AND JOB"
FROM
    emp
```
코드 자동 정렬 단축키 CTRL + F7  
이름 합치기는 줄바꿈이 안되도록 설정에서 아래 처럼 바꿔줘야함  
![image](https://user-images.githubusercontent.com/68311318/123190390-6a851e00-d4da-11eb-9a0a-81124f7cf8e4.png)  

```sql
select profno, name, deptno, 1 from professor where deptno = 101
union
select studno, name, deptno1, 2 from student where deptno1 = 101;
/*
union all은 중복 제거하지 않을때, 그리고 정렬도 다르다. 별로 중요하진 않다
*/
```
실행결과
```
    PROFNO NAME                     DEPTNO          1
---------- -------------------- ---------- ----------
      1001 조인형                      101          1
      1002 박승곤                      101          1
      1003 송도권                      101          1
      9411 서진수                      101          2
      9511 김신영                      101          2
      9611 일지매                      101          2
      9711 이윤나                      101          2
```
1과 2는 단순히 교수와 학생을 구분하기 위한것. 이런 융통성이 필요하다.  

```sql
select ename, sal+comm from emp;
select ename, sal*12 from emp;
```
위처럼 산술연산자를 쓸수있다. 근데 컬럼 하나라도 null이면 연산결과가 null이 나온다.  

```sql
where hiredate like '81%'; -- 81년도에 입사한 사람
where hiredate like '%/05/%'; -- 5월에 입사한 사람
```

```sql
select * from emp where empno = &id;
```
위를 실행하면 입력값을 받는다  