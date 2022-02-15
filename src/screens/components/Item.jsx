import React from "react";
import { StyleSheet } from "react-native";
import { Button, Card, Title, Paragraph, Subheading } from "react-native-paper";
import * as Linking from "expo-linking";

const Item = ({ item, detail, onClick, onButtenClick, buttonText }) => {
  const links = item?.trailer;
  return (
    <Card onPress={onClick}>
      <Card.Content>
        <Title>{item.title === "" ? "No Title" : item.title}</Title>
      </Card.Content>
      <Card.Cover source={{ uri: item.poster }} />
      <Card.Actions>
        <Button onPress={onButtenClick}>{buttonText}</Button>
      </Card.Actions>

      {detail && (
        <Card.Content>
          {links.link !== "" && (
            <Button onPress={() => Linking.openURL(item?.trailer?.link)}>
              Click to see Trailer
            </Button>
          )}

          <Subheading style={styles.textStyle}>Description: </Subheading>
          <Paragraph numberOfLines={3}>{item.plot ? item.plot : "-"}</Paragraph>

          <Subheading style={styles.textStyle}>Rate: </Subheading>
          <Paragraph>{item.rating ? item.rating : "-"} Rate</Paragraph>

          <Subheading style={styles.textStyle}>Votes: </Subheading>
          <Paragraph>
            {item.rating_votes ? item.rating_votes : "-"} Votes
          </Paragraph>

          <Subheading style={styles.textStyle}>Publish Year: </Subheading>
          <Paragraph>{item.year ? `${item.year} Year` : "-"} </Paragraph>

          <Subheading style={styles.textStyle}>Cast: </Subheading>
          {item?.cast?.map((item, i) => {
            return (
              <Paragraph key={(item.actor + i).toString()}>{`${i + 1}. ${
                item.actor
              }: ${item.character}`}</Paragraph>
            );
          })}

          <Subheading style={styles.textStyle}>Technical Specs: </Subheading>
          {item?.technical_specs?.map((item, i) => {
            return (
              <Paragraph key={item[0]}>{`${i + 1}. ${item[0]}: ${
                item[1]
              }`}</Paragraph>
            );
          })}
        </Card.Content>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontWeight: "bold",
  },
});

export default Item;
