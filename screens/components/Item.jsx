import React from "react";
import { Button, Card, Title, Paragraph } from "react-native-paper";

const Item = ({ item, detail, onClick, onButtenClick, buttonText }) => {
  return (
    <Card onPress={onClick}>
      <Card.Content>
        <Title>{item.title === "" ? "No Title" : item.title}</Title>
      </Card.Content>
      <Card.Cover source={{ uri: item.poster }} />
      <Card.Actions>
        <Paragraph>{item.rating ? item.rating : 0} Rate</Paragraph>
        {!detail && (
          <Button onPress={onButtenClick}>{buttonText}</Button>
        )}
      </Card.Actions>
    </Card>
  );
};

export default Item;
