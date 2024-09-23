import React, { Ref } from "react";
import { Text, View } from "react-native";

interface IRichTextEditorProps {
  editorRef?: Ref<any>;
  onChange?: () => void;
}
const RichTextEditor = ({ editorRef, onChange }: IRichTextEditorProps) => {
  return <Text>RichTextEditor</Text>;
};

export default RichTextEditor;
