import React from "react";
import { Button, Card, Title, Paragraph } from "react-native-paper";

const Item = ({ item, detail, onClick, onButtenClick, buttonText }) => {
  return (
    <Card onPress={onClick}>
      <Card.Content>
        <Title>{item.title === "" ? "No Title" : item.title}</Title>
        <Paragraph numberOfLines={3}>{item.plot}</Paragraph>
      </Card.Content>
      <Card.Cover source={{ uri: item.poster }} />
      <Paragraph>{item.rating ? item.rating : 0} Rate</Paragraph>
      <Paragraph>{item.rating_votes? item.rating_votes : 0} Votes</Paragraph>
      <Paragraph>{item.year} Year</Paragraph>
      <Card.Actions>        
        {!detail && (
          <Button onPress={onButtenClick}>{buttonText}</Button>
        )}
      </Card.Actions>
    </Card>
  );
};

export default Item;
