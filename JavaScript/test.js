const object = {
    name : '혼자 공부하는 파이썬',
    price : 180000,
    publisher : '한빛미디어'
}

object.name = object.name || '제목 미정'
object.author = object.author || '저자 미상'

console.log(JSON.stringify(object, null ,2))