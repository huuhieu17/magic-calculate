import React from 'react'
import { ScrollView } from 'react-native'
import { Text } from 'react-native-paper'

const Tutorial = () => {
  return (
    <ScrollView 
        style={{
            padding: 16
        }}
    >
        <Text variant='displaySmall' style={{
            textAlign: 'center',
          }}>Magic Caculator</Text>
          <Text style={{
              marginTop: 10,
              fontSize: 18,
          }}>Magic caculator không chỉ là chiếc máy tính đơn giản, trong đó còn chứa các chức năng bí mật phía như chụp ảnh, video, ...</Text>
          <Text style={{
              marginTop: 10,
              fontSize: 18,
          }}>Về cơ bản khi mọi người nhìn vào giao diện thì là phần mềm máy tính có thể tính toán 1 cách chính xác và bình thường.</Text>
          <Text style={{
              marginTop: 10,
              fontSize: 18,
          }}>Khi bạn chỉ cần nhập đúng mã bí mật của mình và bấm dấu "=", menu ẩn sẽ hiển thị và lúc đó chúng ta sẽ đặt những mã để sử dụng các chức năng.</Text>
          <Text style={{
              marginTop: 10,
              fontSize: 18,
          }}>Sau khi đặt các mã phím tắt thì chỉ cần gõ mã trên màn máy tính sau đó bấm dấu "=" chức năng sẽ được kích hoạt</Text>
          
    </ScrollView>
  )
}

export default Tutorial