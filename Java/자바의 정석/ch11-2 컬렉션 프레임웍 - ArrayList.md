# 1.2 ArrayList
컬렉션 프레임워크에서 가장 많이 사용되는 컬렉션 클래스일것이다.  
기존의 Vector를 개선한 것으로 Vector와 구현원리와 기능적인 측면에서 동일하다고 할 수 있다. 앞에서 얘기했던 것과 같이 Vector는 기존에 작성된 소스와의 호환성을 위해서 계속 남겨 두고 있을 뿐이기 때문에 가능하면 Vector보다는 ArrayList를 사용하자.  
ArrayList는 Object배열을 이용해서 데이터를 순차적으로 저장한다. 배열에 더이상 저장할 공간이 없으면 보다 큰 새로운 배열을 생성해서 기존의 배열에 저장된 내용을 `새로운 배열`로 복사한다음에 저장한다.  
```java
public class ArrayList extends AbstractList 
    implements List, RandomAccess, Cloneable, java.io.Serializable {
        ...
        transient Object[] elementData;
        ...
    }
```
참고 : transient는 직렬화(serialization)와 관련된 제어자이다. 15장에서 다룬다  

![image](https://user-images.githubusercontent.com/68311318/122322349-4cf70800-cf60-11eb-9d44-9408ce1a7c8d.png)  
![image](https://user-images.githubusercontent.com/68311318/122322376-55e7d980-cf60-11eb-985e-96eb43b4f2ac.png)  

```java
import java.util.ArrayList;
import java.util.Collections;

class Test {
  public static void main(String[] args) {
    ArrayList list1 = new ArrayList(10);
    list1.add(new Integer(5));
    list1.add(new Integer(4));
    list1.add(new Integer(2));
    list1.add(new Integer(0));
    list1.add(new Integer(1));
    list1.add(new Integer(3));

    ArrayList list2 = new ArrayList(list1.subList(1, 4));
    print(list1, list2);

    Collections.sort(list1);
    Collections.sort(list2);
    print(list1, list2);

    System.out.println("list1.containsAll(list2):" + list1.containsAll(list2));

    list2.add("B");
    list2.add("C");
    print(list1,list2);
    list2.add(3, "A"); // 삽입. 뒤로 밀어버린다. 새배열을 만든다. 배열은 크기를 변경할수없기때문이다.
    print(list1,list2);

    list2.set(3, "AA"); // 수정
    print(list1, list2);

    // list1에서 list2와 겹치는 부분만 남기고 나머지는 삭제한다, 같은 데이터면 전부 남긴다. 
    // retain: 유지하다
    System.out.println("list1.retainAll(list2):" + list1.retainAll(list2));

    print(list1,list2);

    for(int i = list2.size() - 1; i >= 0; i--) {
      if(list1.contains(list2.get(i))) {
        list2.remove(i); // 삭제. 앞으로 당겨진다.
      }
    }
    //    for(int i = 0; i <= list2.size() - 1; i++) {
    //      if(list1.contains(list2.get(i))) {
    //        list2.remove(i); // 수정이 아닌 아예 제거. 새로운 배열을 만든다.
    //      }
    //    }
    print(list1, list2);
  }

  private static void print(ArrayList list1, ArrayList list2) {
    System.out.println("list1:" + list1);
    System.out.println("list2:" + list2);
    System.out.println();
  }
}
```
ArrayList는 List인터페이스를 구현했기 때문에 저장된 순서를 유지한다는 것을 알 수 있다. Collections클래스에 대한 내용과 정렬(sort)하는 방법은 후에 다룰것이다.  
참고 : Collection은 인터페이스고 Collections는 클래스다  

```java
for(int i = list2.size() - 1; i >=0 ; i--) {
    if(list1.contains(list2.get(i)))
        list2.remove(i);
}
```
위 코드는 list2에서 list1과 공통되는 요소를 찾아서 삭제하는 부분이다. 거꾸로 반복시켰다.  
만일 i를 증가시켜가면서 삭제하면, 한 요소가 삭제될때마다 빈공간을 채우기 위해 나머지 요소들이 자리이동을 하기 때문에 올바른 결과를 얻을 수 없다. 그래서 제어변수를 감소시켜가면서 삭제를 해야 자리이동이 발생해도 영향을 받지않고 작업이 가능하다.  
여기에 대해서는 나중에 자세히 설명할것이다.  
참고 : 위 예제의 for문을 변경해서 i의값을 증가시켜가면서 삭제해보면 쉽게 이해할수있다.  

```java
import java.util.ArrayList;
import java.util.List;

class Test {
  public static void main(String[] args) {
    final int LIMIT = 10; // 자르고자 하는 글자의 개수를 지정한다.
    String source = "0123456789abcdefghijABCDEFGHIJ!@#$%^&*()ZZZ";
    int length = source.length();

    List list = new ArrayList(length/LIMIT + 10); // 크기를 약간 여유있게 잡는다

    for(int i = 0; i < length; i += LIMIT) {
      if(i + LIMIT < length) {
        list.add(source.substring(i, i + LIMIT));
      } else {
        list.add(source.substring(i));
      }
    }

    for(int i = 0; i < list.size(); i++) {
      System.out.println(list.get(i));
    }
  }
}
```
긴 문자열 데이터를 원하는 길이로 잘라서 ArrayList에 담은 다음 출력하는 예제이다. 단순히 문자열을 특정크기로 잘라서 출력할 것이라면, charAt(int)와 for문을 사용하면 되겠지만 ArrayList에 잘라서 담아놓음으로써 ArrayList의 기능을 이용해서 다양한 작업을 간단하게 처리할 수 있다.  

```java
List list = new ArrayList(length/LIMIT + 10); 
```
실제 저장할 개수보다 크기를 약간 여유있게 잡는것이 좋다. 생성할때 지정한 크기보다 더 많은 객체를 저장하면 자동적으로 크기가 늘어나기는 하지만 이 과정에서 처리시간ㅇ니 많이 소요되기 때문이다.  

```java
import java.util.Vector;

class Test {
  public static void main(String[] args) {
    Vector v = new Vector(5); // capacity
    v.add("1");
    v.add("2");
    v.add("3");
    print(v);

    v.trimToSize(); // 빈공간을 없앤다(용량과 크기가 같아진다
    System.out.println("===After trimToSize()===");
    print(v);

    v.ensureCapacity(6);
    System.out.println("===After ensureCapacity(6)===");
    print(v);

    v.setSize(7);
    System.out.println("===After setSize(7)===");
    print(v);

    v.clear();
    System.out.println("===After clear()===");
    print(v);
  }

  private static void print(Vector v) {
    System.out.println(v);
    System.out.println("size: " + v.size());
    System.out.println("capacity: " + v.capacity());
  }
}
```
실행결과
```
[1, 2, 3]
size: 3
capacity: 5
===After trimToSize()===
[1, 2, 3]
size: 3
capacity: 3
===After ensureCapacity(6)===
[1, 2, 3]
size: 3
capacity: 6
===After setSize(7)===
[1, 2, 3, null, null, null, null]
size: 7
capacity: 12
===After clear()===
[]
size: 0
capacity: 12

```
이 예제는 Vector의 용량과 크기에 관한 것인데, 각 실행과정을 단계별로 그림으로 이해하자.  
![image](https://user-images.githubusercontent.com/68311318/122328417-90567400-cf6a-11eb-93f2-92cf92dfb02e.png)  
![image](https://user-images.githubusercontent.com/68311318/122328429-977d8200-cf6a-11eb-9c2e-7aaa4a380734.png)  

ArrayList나 Vector 같이 `배열`을 이용한 자료구조는 데이터를 읽어오고 저장하는 데는 효율이 좋지만, 용량을 변경해야할 때는 새로운 배열을 생성한 후 기존의 배열로부터 새로 생성된 배열로 데이터를 복사해야하기 때문에 상당히 효율이 떨어진다는 단점을 가지고 있다. 그래서 처음에 인스턴스를 생성할 때, 저장할 데이터의 개수를 잘 고려하여 충분한 용량의 인스턴스를 생성하는 것이 좋다.  

지금까지 ArrayList에 대한 기본 내용을 모두 살펴보앗다. 이제는 좀더 깊숙이 들어가서 Array클래스의 내부를 분석해보자.  
다음의 예제는 Verctor클래스의 실제코드를 바탕으로 이해하기 쉽게 재구성한것이다.  

```java
public class MyVector {
  Object[] data = null;
  int capacity = 0;
  int size = 0;

  public MyVector(int capacity) {
    if (capacity< 0) {
      throw new IllegalArgumentException("유효하지 않은 값입니다. :" + capacity);
    }

    this.capacity = capacity;
    data = new Object[capacity];
  }

  public MyVector() {
    this(10);
  }

  public void ensureCapacity(int minCapacity) {
    if (minCapacity - data.length > 0) {
      setCapacity(minCapacity);
    }
  }

  public boolean add(Object obj) {
    ensureCapacity(size + 1);
    data[size++] = obj;
    return true;
  }

  public Object get(int index) {
    if(index < 0 || index >= size) {
      throw new IndexOutOfBoundsException("범위를 벗어났습니다");
    }
    return data[index];
  }

  public Object remove(int index) {
    Object oldObj = null;

    if(index < 0 || index >= size) {
      throw new IndexOutOfBoundsException("범위를 벗어났습니다.");
    }
    oldObj = data[index];

    // 삭제하고자 하는 객체가 마지막 객체가 아니라면, 배열복사를 통해 빈자리를 채워줘야한다
    if(index != size-1) {
      System.arraycopy(data, index+1, data, index, size-index-1);
    }

    data[size-1] = null;
    size--;
    return oldObj;
  }

  public void trimToSize() {
    setCapacity(capacity);
  }

  public void clear() {
    for (int i = 0; i < size; i++) {
      data[i] = null;
    }
    size = 0;
  }

  public Object[] toArray() {
    Object[] result = new Object[size];
    System.arraycopy(data, 0, result, 0, size);

    return result;
  }

  private void setCapacity(int capacity) {
    if(this.capacity == capacity) return; // 크기가 같으면 변경하지 않는다

    Object[] tmp = new Object[capacity];
    System.arraycopy(data, 0, tmp, 0, size);
    data = tmp;
    this.capacity = capacity;
  }
}
```
List인터페이스의 메서드 중 주석처리 한 것은 코드를 정상적으로 동작하도록 구현한 것이고, 주석처리 하지 않은 것은 컴파일만 가능하도록 최소한으로 구현한 것이다.  
참고 : 인터페이스를 구현할 때 인터페이스에 정의된 모든 메서드를 구현해야한다. 일부 메서드만 구현했다면 추상클래스로 선언해야한다. 그러나 JDK1.8부터 List인터페이스에 3개의 디폴트 메서드가 추가되었으며, 이 들은 구현하지 않아도 된다  
![image](https://user-images.githubusercontent.com/68311318/122393441-d71a8d00-cfaf-11eb-892b-20bbe256af1d.png)
![image](https://user-images.githubusercontent.com/68311318/122393456-dda90480-cfaf-11eb-9a37-714afcf6fc34.png)  
이 중에서 위의 메서드들은 우리가 스스로 구현할 수 있을 정도의 수준이므로 올바르게 동작하도록 코드를 직접 작성하고 테스트해보자. 또는 메서드의 실제 구현내용을 모두 삭제하고 본인이 직접 다시 코드를 작성해보는것도 좋다  

우리가 알아야 할 것은 배열에 객체를 `순차적으로` 저장할때와 객체를 마지막에 저장된 것부터 삭제하는 경우, System.arraycopy()를 호출해서 다른 데이터의 위치를 이동시켜 줘야 하기 때문에 다루는 데이터의 개수가 많을 수록 작업시간이 오래걸린다는 것이다  
**Java API소스보기**  
Vector클래스와 같이 Java API에서 제공하는 기본 클래스의 실제 소스를 보고싶다면 JDK를 설치한 디렉토리의 src.zip파일을 찾을 수 있다.  
src.zip이라는 파일의 압축을 푼 다음, 패키지별로 찾아 들ㄹ어가면 원하는 클래스의 실제 소스를 볼 수 있다.  
예를 들어 Vector클래스는 java.util패키지에 있으므로 src\java\util\Vector.java가 소스파일이다. Java API의 소스는 오랜 경력의 프로그머들에 의해 작성된 것이기 때문에 어떻게 작성하였는지 보고 따라하는 것은 프로그래밍 실력을 향상시키는데 많은 도움이 될것이다!  