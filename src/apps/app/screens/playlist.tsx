import React from 'react';
import { Text } from 'dripsy';

import { createParam } from 'repro-app/navigation/use-param';
import type { PlaylistScreenProps } from 'repro-app/navigation/types';

type Query = {
  id: string;
};

const { useParam } = createParam<Query>();

export default function PlaylistScreen({ navigation, route }: PlaylistScreenProps) {
  const [id, setId] = useParam('id');

  return <Text sx={{ color: 'white' }}>Playlist {id}</Text>;
}
