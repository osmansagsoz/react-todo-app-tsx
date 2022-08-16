import css from "./container.module.css";
import { Header } from "./header";
import { TodoArea } from "./todoArea";
import { IAppState, TagType, TodoType } from "../../types"
import { FunctionComponent } from "react";

interface IProps {
  tags: TagType[] | undefined;
  onTagCreated: (params: { name: string }) => void;
  appState: IAppState;
  onTodoCreated: (params: TodoType) => void;
}

export const Container: FunctionComponent<IProps> = ({ tags, onTagCreated, appState, onTodoCreated }) => {
  return (
    <section className={css.container}>
      <Header appState={appState} />
      <TodoArea
        tags={tags}
        onTagCreated={onTagCreated}
        onTodoCreated={onTodoCreated}
      />
    </section>
  );
};
