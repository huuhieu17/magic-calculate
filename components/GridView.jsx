import { isArray } from 'mathjs';
import React from 'react';
import { StyleSheet, ScrollView, Dimensions, View, FlatList } from 'react-native';

// Gap stuff


const GridView = ({ gap = 12, itemPerRow = 3, items }) => {
    console.log(!isArray(items))
    const size = Dimensions.get('window').width / itemPerRow;
    const styles = StyleSheet.create({
        itemContainer: {
            width: size,
            height: size,
        },
        item: {
            flex: 1,
            margin: 3,
            backgroundColor: 'lightblue',
        }
    });

   return (
       <FlatList
           data={items}
           renderItem={({ item, index }) => (
               <View key={index} style={styles.itemContainer}>
                   <View style={styles.item}>
                       {item}
                   </View>
               </View>
           )}
           keyExtractor={(item, index) => index}
           numColumns={itemPerRow} />
   );
   
};

export default GridView;

