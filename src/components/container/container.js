import css from "./container.module.css";
import { Header } from "./header";
import { TodoArea } from "./todoArea";


export const Container = ({ tags, onTagCreated, appState, onTodoCreated }) => {
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
