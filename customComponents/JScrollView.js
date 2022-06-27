import {StyleSheet, ScrollView, RefreshControl} from 'react-native';
import React from 'react';

export default function JScrollView({
  refreshing,
  onRefresh,
  horizontal = false,
  showsVerticalScrollIndicator = false,
  showHorizontalScrollIndicator = false,
  children,
  style,
  contentContainerStyle,
  enable = true,
}) {
  return (
    <ScrollView
      style={style}
      contentContainerStyle={contentContainerStyle}
      horizontal={horizontal}
      refreshControl={
        enable && (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        )
      }
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      showsHorizontalScrollIndicator={showHorizontalScrollIndicator}>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
