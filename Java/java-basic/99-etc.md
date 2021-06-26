## getClass()

instanceof 연산자와는 다르게 특정 클래스의 인스턴스인지를 검사.

```java
System.out.println(v.getClass() == Sedan.class); //true
System.out.println(v.getClass() == Car.class);   //false
System.out.println(v.getClass() == Object.class);//false
System.out.println(v.getClass() == Truck.class); //false
```

## String, StringBuffer, StringBuilder
- **String** 클래스는 **immutable**이기 때문에 연산이 많은 프로그래밍이 필요할 때 계속해서 인스턴스를 생성하므로 성능이 떨어진다. 조회가 많은 환경, 멀티스레드 환경에서 성능적으로 유리하다.
- 반면 **StringBuffer** 나 **StringBuilder**는 객체 한 번만 만들고 메모리의 값을 변경시켜서 문자열을 변경한다. 따라서 문자열 연산이 자주 있을 때 사용하면 성능이 좋다.
- StringBuffer는 동기화지원을 하고 StringBuilder는 동기화 지원을 하지 않는다. 따라서 멀티 스레드 환경에서는 StringBuffer를 사용하는 것이, 싱글 스레드 환경이나 멀티스레드여도 굳이 동기화가 필요 없는 경우에는 StringBuilder를 사용하는 것이 좋다.
- 위의 코드와 같은 경우에는 로컬변수를 StringBuilder타입으로 선언하였다. 로컬 변수는 여러 스레드가 절대 동시에 사용할 수 없기 때문에 StringBuilder를 사용하여도 무방하다.  

## 하위 클래스의 레퍼런스로 상위 클래스를 가리킬 수는 없다
상위 클래스의 인스턴스에는 하위 클래스의 인스턴스 변수가 없을 수도 있기 때문이다. 개발자가 레퍼런스를 통해 존재하지 않는 인스턴스 멤버를 사용하는 것을 방지하기 위해 컴파일 단계에서 막는다. 명시적 형변환을 하면 컴파일 단계에서는 막지 못해도 런타임 에러가 발생한다. (`java.lang.ClassCastException`: 맞지 않는 것을 던지지 마라!)  

## 도메인(domain) 객체
- 업무 분석 과정에서 도출한 *핵심 개념을 표현하는 클래스* 이다.
- 도메인 클래스는 업무에서 다뤄지는 **정보** 를 *필드* 로 선언하고 그 정보를 처리하는 **행위** 를 *메서드* 로 정의한다.
- 예) Board, Member, Projet, Task

```
class Board {
  // 정보
  int no;
  String title;

  // 업무 행위
  void add(Board board) {...}
  Board[] list() {...}
}
```

**값 객체(Value Object; VO)** 와 **서비스 객체(Service Object)**  

- 실무에서는 도메인 클래스를 좀 더 쉬운 방식으로 다루기 위해 정보와 행위를 분리한다.
- 업무 정보는 필드와 getter/setter 로 구성된 VO 클래스로 정의한다.
  - **데이터 타입** 으로서 역할을 한다.
- 업무 행위를 표현한 메서드는 Service 클래스로 정의한다.
- 예) BoardVO/BoardService, MemberVO/MemberService 등

```
class Board {
  // 정보
  int no;
  String title;

  int getNo() {...}
  void setNo(int no) {...}

  String getTitle() {...}
  void setTitle(String title) {...}
}

class BoardService {}
  // 업무 행위
  void add(Board board) {...}
  Board[] list() {...}
}
```

**Domain Object** , **Value Object** , **Model Object** , **Data Transfer Object**  

- 실무에서는 보통 *도메인 객체* 를 *값 객체(VO)* , *모델 객체* 라 부른다.
- 예전에는 *DTO* 라 부르기도 했다.
- 개발 회사나 개발자에 따라 이 용어를 엄격히 구분하여 사용하기도 한다.
- 그러나 대부분의 개발자는 같은 것으로 취급한다.
- 예) Board == BoardVO == BoardModel == BoardDTO

## 오버라이딩과 다형성
다형성에는 다형적 변수, 오버로딩, 오버라이딩이있다.  
부모 레퍼런스로 자식 객체를 담을 수 있다. 그러나 부모 레퍼런스로는 부모의 멤버만 접근할 수 있지, 자식만의 멤버는 접근할 수 없다. 그런데 자식에서 부모의 메서드를 오버라이딩한 메서드는 부모레퍼런스로도 사용할 수 있다. 이것이 다형성이다.  

## 독해
객체를 사람처럼 생각하고(주어 = 객체, 동사 = 메서드), 즉, 메서드는 객체에게 명령을 내리는것으로 생각하는게 좋다.  
클래스를 나라고 생각한다.  
레퍼런스를 전화번호라고 생각해도 좋다. 예를 들면 클래스 멤버변수로 A객체 레퍼런스가 선언되어있다고 하자. 클래스 멤버변수에 뒀다는 건 여기에 둘테니까 필요한 메서드는 갖다 쓰라는 식으로 생각해도 좋다.  
식판과 식판카트  
너무 사람처럼 생각하는데 집착안해도 된다. 그때그때 좋은 걸로 하면된다.  