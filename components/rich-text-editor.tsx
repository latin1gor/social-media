import React, { Ref } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { theme } from "@/constants/theme";

interface IRichTextEditorProps {
  editorRef?: Ref<any>;
  onChange?: (body: any) => void;
}
const RichTextEditor = ({ editorRef, onChange }: IRichTextEditorProps) => {
  return (
    <View style={{ minHeight: 285 }}>
      <RichToolbar
        editor={editorRef}
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
          actions.heading1,
          actions.heading4,
        ]}
        iconMap={{
          [actions.heading1]: ({ tintColor }: { tintColor: any }) => (
            <Text style={{ color: tintColor, fontWeight: "bold" }}>H1</Text>
          ),
          [actions.heading4]: ({ tintColor }: { tintColor: any }) => (
            <Text style={{ color: tintColor }}>H4</Text>
          ),
        }}
        selectedIconTint={theme.colors.primaryDark}
        disabled={false}
        style={styles.richBar}
        flatContainerStyle={styles.flatStyle}
      />

      <RichEditor
        ref={editorRef}
        containerStyle={styles.rich}
        editorStyle={styles.editorStyle}
        placeholder={"What's on your mind?"}
        onChange={onChange}
      />
    </View>
  );
};

export default RichTextEditor;

const styles = StyleSheet.create({
  richBar: {
    borderTopRightRadius: theme.radius.xl,
    borderTopLeftRadius: theme.radius.xl,
    backgroundColor: theme.colors.gray,
  },
  rich: {
    minHeight: 240,
    flex: 1,
    borderWidth: 1.5,
    borderTopWidth: 0,
    borderBottomRightRadius: theme.radius.xl,
    borderBottomLeftRadius: theme.radius.xl,
    borderColor: theme.colors.gray,
    padding: 5,
  },
  contentStyle: {
    color: theme.colors.text,
  },
  flatStyle: {
    paddingHorizontal: 8,
    gap: 3,
  },
});
