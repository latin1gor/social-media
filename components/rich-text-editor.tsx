import React, { Ref } from "react";
import { StyleSheet, View } from "react-native";
import { actions, RichToolbar } from "react-native-pell-rich-editor";

interface IRichTextEditorProps {
  editorRef?: Ref<any>;
  onChange?: (body: any) => void;
}
const RichTextEditor = ({ editorRef, onChange }: IRichTextEditorProps) => {
  return (
    <View style={{ minHeight: 285 }}>
      <RichToolbar
        editor={editorRef || null}
        actions={[
          actions.setStrikethrough,
          actions.removeFormat,
          actions.setBold,
          actions.setItalic,
          actions.insertOrderedList,
          actions.blockquote,
          actions.alignLeft,
          actions.alignRight,
          actions.alignCenter,
          actions.code,
          actions.line,
        ]}
        disabled={false}
        style={styles.richBar}
        flatContainerStyle={styles.listStyle}
      />
    </View>
  );
};

export default RichTextEditor;

const styles = StyleSheet.create({
  richBar: {
    // Add any styles for the toolbar
  },
  listStyle: {
    // Add any styles for the toolbar container
  },
});
