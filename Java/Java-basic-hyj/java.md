이클립스 2020-6  

file > new > java project  

## 1.4 자바 프로그램 개발 순서
### 1.4.2 프로그램 소스 분석
java.exe로 JVM을 구동시키면 제일 먼저 main() 메소드를 찾아서 실행시킨다.  
main()가 없거나 잘못 작성하면 클래스를 실행할 수 없다. main() 메소드가 없는 클래스를 java.exe로 실행시키면  
다음과 같은 에러 메시지가 나타난다.  
```
기본 메소드를 찾을 수 없습니다. 다음 형식으로 기본 메소드를 정의하십시오.
```

## 1.5 주석과 실행문
### 1.5.1 주석 사용하기
컴파일 과정에서 주석은 무시되고 실행문만 바이트 코드로 번역된다.  
자바 API 도큐먼트 문서에 포함되는 도큐먼트 주석 /** ~ */도 있다.  
도큐먼트 주석은 java doc.exe 명령어로 API 도큐먼트를 생성하는데 사용된다.  

--------------------------------

# 2. 변수와 타입
cpu는 램이나 캐시에 있는 데이터만 갖다 쓸수있다.  
파일이나 db에는 접근할 수 없다.  
그래서 변수가 필요하다.  

# 3. 연산자
## 확인문제
### 문제 7
사다리꼴의 넓이가 정확히 소수자릿수가 나올 수 있도록
```java
int lengthTop = 5;
int lengthBottom = 10;
int height = 7;
double area = (lengthTop + lengthBottom) * height / 2.0; // 또는 (double)2
System.out.println(area);
```

### 문제 8
```java
double x = 5.0;
double y = 0.0;

double z = x % y;

if(Double.isNaN(z)) {
    System.out.println("0.0으로 나눌 수 없습니다");
} else {
    double result = z + 10;
    System.out.println("결과:" + result); // z = x/y라고 하면 infinity가 나옴
}
```

----------------------------

# 4 조건문과 반복문
if문과 switch문을 둘다 쓸수있는 상황에는 switch를 쓰는게 최적화가 좋다. 근데 자바 할때는 그런거 신경안쓴다.  

## 피보나치 수열

# 5 참조타입
메소드 영역    
힙 영역  
JVM 스택  

# 6 배열 타입
배열 : 같은 타입의 데이터를 연속된 공간에 저장하는 자료구조  
각 데이터 저장위치는 인덱스 부여해 접근  

```java
public class Test {
  public static void main(String[] args) {
    int[] arr1 = new int[] {1,2,3};
    int[] cpy1 = arr1.clone();

    // System의 어레이카피는 new를 했어야했다
    // 근데 clone은 그럴필요가 없다

    arr1[0] = 10;

    for(int i = 0; i < arr1.length; i++) {
      System.out.print(arr1[i] + ",");
    }
    System.out.println();
    for(int i = 0; i < cpy1.length; i++) {
      System.out.print(cpy1[i] + ",");
    }
  }
}
```
1차원 배열의 깊은복사는 위처럼 clone()을 써도 된다. System 어레이카피를 써도 된다.  
2차원 배열 clone() 하는 것은 주의해야한다.  
2차원 배열을 clone()을 했을때 깊은복사가 되겠지만, 2차원 배열은 배열의 배열이다. 즉 각각의 요소가 가리키는 배열까지 복사하진 못한다는것. 그래서 각각의 요소가 가리키는 배열까지 clone()하면 된다.  
```java
public class ArrayTest7 {
	public static void main(String[] args) {
		//1차원 배열의 깊은복사(복제)
//		int[] arr1 = new int[] {1,2,3};
//		int[] cpy1 = arr1.clone();
//		
//		arr1[0] =10;
//		
//		for(int i=0; i<arr1.length; i++) {
//			System.out.print(arr1[i]+",");
//		}
//		System.out.println();
//		for(int i=0; i<cpy1.length; i++) {
//			System.out.print(cpy1[i]+",");
//		}	
		
		//2차원 배열의 깊은복사(복제)
		int[][] arry = {{10,20},{30,40}};
		int[][] acpy = arry.clone();
		acpy[0] = arry[0].clone();
		acpy[1] = arry[1].clone();
		arry[0][0] = 90;
		for(int i=0; i<arry.length; i++) {
			for(int j=0; j<arry[0].length; j++) {
				System.out.print(arry[i][j]+" ");
			}
			System.out.println();
		}
		
		for(int i=0; i<acpy.length; i++) {
			for(int j=0; j<acpy[0].length; j++) {
				System.out.print(acpy[i][j]+" ");
			}
			System.out.println();
		}
	}
}

```