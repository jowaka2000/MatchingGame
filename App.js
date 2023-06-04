import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [score, setScore] = useState(0);
  const [tiles, setTiles] = useState([]);
  const [selectedTile, setSelectedTile] = useState(null);

  useEffect(() => {
    generateTiles();
  }, []);

  const generateTiles = () => {
    const newTiles = [];
    const colors = ['red', 'blue', 'green', 'yellow'];

    for (let i = 0; i < 8; i++) {
      const colorIndex = Math.floor(Math.random() * colors.length);
      const color = colors[colorIndex];
      newTiles.push({ id: i, color: color, flipped: false });
      newTiles.push({ id: i + 8, color: color, flipped: false });
    }

    shuffleTiles(newTiles);
    setTiles(newTiles);
  };

  const shuffleTiles = (tiles) => {
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
  };

  const flipTile = (tile) => {
    if (selectedTile) {
      if (selectedTile.id !== tile.id && selectedTile.color === tile.color) {
        const updatedTiles = tiles.map((t) =>
          t.id === tile.id || t.id === selectedTile.id ? { ...t, flipped: true } : t
        );
        setTiles(updatedTiles);
        setSelectedTile(null);
        setScore(score + 10);
      } else {
        setTimeout(() => {
          const updatedTiles = tiles.map((t) =>
            t.id === tile.id || t.id === selectedTile.id ? { ...t, flipped: false } : t
          );
          setTiles(updatedTiles);
          setSelectedTile(null);
          setScore(score - 5);
        }, 1000);
      }
    } else {
      const updatedTiles = tiles.map((t) => (t.id === tile.id ? { ...t, flipped: true } : t));
      setTiles(updatedTiles);
      setSelectedTile(tile);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Score: {score}</Text>
      <View style={styles.tilesContainer}>
        {tiles.map((tile) => (
          <TouchableOpacity
            key={tile.id}
            style={[styles.tile, { backgroundColor: tile.flipped ? tile.color : 'gray' }]}
            onPress={() => flipTile(tile)}
            disabled={tile.flipped}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tilesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tile: {
    width: 80,
    height: 80,
    borderRadius: 8,
    margin: 10,
  },
});
