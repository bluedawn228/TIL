# 싱글톤 패턴

- 인스턴스를 한 개만 생성하여 공유하고 싶다면, Singleton 설계 방식으로 클래스를 정의한다.
- 만약 API를 사용할 때 생성자가 private으로 막혀 있다면 클래스의 static 메서드인 getInstance 를 찾아보자. 

```java
class Car {
    String model;
    int cc;
    // 인스턴스 주소를 받을 클래스 필드
    private static Car instance;
    
    // 1. 생성자를 외부에서 호출할 수 없도록 private으로 정의
    //    => 내부에서만 사용 가능 
    private Car(){}
    
    // 2. 인스턴스를 생성해주는 메서드 정의
    public static void getInstance(){
    	if (instance == null) {
            // 인스턴스 생성한 적이 없다면 즉시 인스턴스 생성
            instance = new Car();
        }
        return instance;
    }
}

public class Test01 {
    public static void main(String[] args) {
        //Car c1 = new Car(); => 컴파일 오류!
        
        // 인스턴스 생성해주는 메서드를 통해 인스턴스 얻는다.
        Car c1 = Car.getInstance();
        Car c2 = Car.getInstance();
        System.out.println(c1 == c2); //true
    }
}
```
