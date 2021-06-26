목록을 따라가면서 값을 조회**(**순차적으로 조회**한다; iterator)  
순차적으로, 반복적으로 따라가면서 값을 조회하는 것을 영어로하면 Iterator라고 한다  
이 자료구조들은 값을 꺼낼 때마다 호출하는 메서드가 다르다. Queue는 `poll()`, Stack은 `pop()`, List(LinkedList와 ArrayList)는 `get()`이다.  

우리가 컬렉션에서 값을 꺼낼때마다 poll(), pop(), get() 등 메서드 이름이 다 다르다  
그래서 그 메서드 이름을 통일시켜주고싶다 next()  
Iterator 구현체 : 대신해주는사람  
그래서 우리가 Iterator한테 next()해달라고하면 Iterator가 Queue한테 poll()하고 Stack한테 pop()하고 List한테 get()