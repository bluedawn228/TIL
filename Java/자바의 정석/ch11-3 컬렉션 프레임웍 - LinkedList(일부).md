```java
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class ArrayListLinkedListTest {
  public static void main(String[] args) {
    // 추가할 데이터의 개수를 고려하여 충분히 잡아야한다
    ArrayList al = new ArrayList(2000000);
    // 안그래도 된다
    LinkedList ll = new LinkedList();

    System.out.println("=순차적으로 추가하기=");
    System.out.println("ArrayList: " + add1(al));
    System.out.println("LinkedList: " + add1(ll));
    System.out.println();
    System.out.println("=중간에 추가하기=");
    System.out.println("ArrayList: " + add2(al));
    System.out.println("LinkedList: " + add2(ll));
    System.out.println();
    System.out.println("=중간에 삭제하기=");
    System.out.println("ArrayList: " + remove2(al));
    System.out.println("LinkedList: " + remove2(ll));
    System.out.println();
    System.out.println("=순차적으로 삭제하기=");
    System.out.println("ArrayList: " + remove1(al));
    System.out.println("LinkedList: " + remove1(ll));
    System.out.println();
  }

  private static long add1(List list) {
    long start = System.currentTimeMillis();
    for(int i = 0; i < 1000000; i++) list.add(i+"");
    long end = System.currentTimeMillis();
    return end - start;
  }

  private static long add2(List list) {
    long start = System.currentTimeMillis();
    for(int i = 0; i < 1000000; i++) list.add(500, "X");
    long end = System.currentTimeMillis();
    return end - start;
  }

  private static long remove1(List list) {
    long start = System.currentTimeMillis();
    for(int i = list.size() - 1; i >= 0; i--) list.remove(i);
    long end = System.currentTimeMillis();
    return end - start;
  }

  private static long remove2(List list) {
    long start = System.currentTimeMillis();
    for(int i = 0; i < 10000; i++) list.remove(i);
    long end = System.currentTimeMillis();
    return end - start;
  }

}

```
실행결과..
```
=순차적으로 추가하기=
ArrayList: 201
LinkedList: 261

=중간에 추가하기=
ArrayList: 604568
LinkedList: 875

=중간에 삭제하기=
ArrayList: 8068
LinkedList: 178

=순차적으로 삭제하기=
ArrayList: 15
LinkedList: 44

```
결론1 : 순차적으로 추가/삭제하는 것은 ArrayList가 LinkedList보다 빠르다  
결론2 : 중간 데이터를 추가/삭제하는 것은 LinkedList가 ArrayList보다 빠르다  

```java
import java.util.LinkedList;
import java.util.Queue;
import java.util.Stack;

public class StackQueueEx {
  public static void main(String[] args) {
    Stack st = new Stack();
    Queue q = new LinkedList(); // Queue인터페이스의 구현체인 LinkedList 사용

    st.push("0");
    st.push("1");
    st.push("2");

    q.offer("0");
    q.offer("1");
    q.offer("2");

    System.out.println("=Stack=");
    while(!st.empty()) {
      System.out.println(st.pop());
    }

    System.out.println("=Queue=");
    while(!q.isEmpty()) {
      System.out.println(q.poll());
    }
  }
}

```
```java
import java.util.EmptyStackException;
import java.util.Vector;

public class MyStack extends Vector {
  public Object push(Object item) {
    addElement(item);
    return item;
  }

  public Object pop() {
    Object obj = peek(); // Stack에 저장된 마지막 요소를 읽어온다
    // 만일 Stack이 비어있으면 peek()메서드가 EmptyStackException을 발생시킨다
    // 마지막 요소를 삭제한다. 배열의 index가 0부터 시작하므로 1을 빼준ㄴ다
    removeElementAt(size() - 1);
    return obj;
  }

  public Object peek() {
    int len = size();
    if (len == 0) {
      throw new EmptyStackException();
    }
    // 마지막 요소를 반환한다. 배열의 index가 0부터 시작하므로 1을 빼준다
    return elementAt(len - 1);
  }

  public boolean empty() {
    return size() == 0;
  }

  public int search(Object o) {
    int i = lastIndexOf(o); // 끝에서부터 객체를 찾는다
    // 반환값은 저장된 위치(배열의 index)다

    if(i >= 0) { // 객체를 찾은 경우
      return size() - i; // Stack은 맨 위에 저장된 객체의 index를 1로 정의하기 때문에
      // 계산을 통해 구한다
    }
    return -1; // 해당객체를 찾지 못하면 -1를 반환한다
  }
}

```

```java
import java.util.Stack;

public class StackEx1 {
  public static Stack back = new Stack();
  public static Stack forward = new Stack();

  public static void main(String[] args) {
    goURL("1.네이트");
    goURL("2.야후");
    goURL("3.네이버");
    goURL("4.다음");

    printStatus();

    goBack();
    System.out.println("=뒤로가기버튼을 누른후=");
    printStatus();

    goBack();
    System.out.println("='뒤로'버튼을 누른후=");
    printStatus();

    goForward();
    System.out.println("='앞으로'버튼을 누른후=");
    printStatus();

    goURL("codechobo.com");
    System.out.println("=새로운 주소로 이동후=");
    printStatus();
  }

  private static void goForward() {
    if(!forward.empty()) {
      back.push(forward.pop());
    }
  }

  private static void goBack() {
    if(!back.empty()) {
      forward.push(back.pop());
    }
  }

  private static void goURL(String url) {
    back.push(url);
    if(!forward.empty()) {
      forward.clear();
    }

  }

  private static void printStatus() {
    System.out.println("back:" + back);
    System.out.println("forward:" + forward);
    System.out.println("현재화면은 '" + back.peek() + "'입니다.");
    System.out.println();

  }
}

```
```java
import java.util.EmptyStackException;
import java.util.Stack;

public class ExpValidCheck {
  public static void main(String[] args) {
    if(args.length!=1) {
      System.out.println("Usage: java ExpValidCheck \"EXPRESSION\"");
      System.out.println("Example: java ExpValidCheck \"((2+3)*1)+3\"");
    }
    Stack st = new Stack();
    String expression = args[0];

    System.out.println("expression:" + expression);

    try {
      for(int i = 0; i < expression.length(); i++) {
        char ch = expression.charAt(i);

        if(ch=='(') {
          st.push(ch + "");
        } else if (ch==')') {
          st.pop();
        }
      }
      if(st.isEmpty()) {
        System.out.println("괄호가 일치합니다.");
      } else {
        System.out.println("괄호가 일치하지 않습니다");
      }
    } catch(EmptyStackException e) {
      System.out.println("괄호가 일치하지 않습니다");
    }
  }
}

```