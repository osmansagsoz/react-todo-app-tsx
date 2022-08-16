import css from "./container.module.css";
import cx from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFireFlameCurved,
  faFire,
  faFireFlameSimple,
  faTag
} from "@fortawesome/free-solid-svg-icons";
import { useCallback } from "react";

const ExtraField = ({
  todoData,
  handleChange,
  setTodoData,
  closed,
  showTimeField,
  priClosed,
  showPriField,
  tagClosed,
  showTagField,
  tags
}) => {
  const handleTimeChange = useCallback(
    (event) => {
      const re = /^[0-9:\b]+$/;
      if (event.target.value === "" || re.test(event.target.value)) {
        // const timeParts = event.target.value.split(":");
        // const date = new Date();
        // const unix = date.setHours(timeParts[0], timeParts[1]);

        setTodoData({
          ...todoData,
          [event.target.name]: event.target.value
        });
      }
    },
    [setTodoData, todoData]
  );

  return (
    <div className={css.extraField}>
      <div className={css.dateWrapper}>
        <button type="button" className={css.dateField} onClick={showTimeField}>
          Add time
        </button>
        <div className={cx(css.popper, !closed && css.popperOpen)}>
          <div className={css.timeForm}>
            <input
              type="text"
              name="time"
              placeholder="eg, 16:00"
              value={todoData.time}
              onChange={handleTimeChange}
            />
            <button type="button" aria-label="Add selected time">
              +
            </button>
          </div>
        </div>
      </div>
      <div className={css.todoTags}>
        <div className={css.priWrapper}>
          <button
            type="button"
            className={css.priority}
            onClick={showPriField}
            aria-label="Set priority"
          >
            <FontAwesomeIcon icon={faFireFlameCurved} />
          </button>
          <div className={cx(css.priPopper, !priClosed && css.popperOpen)}>
            <ul>
              <li>
                <label htmlFor="pri1">
                  <input
                    type="radio"
                    id="pri1"
                    name="priority"
                    value="Priority 1"
                    checked={todoData.priority === "Priority 1"}
                    onChange={handleChange}
                  />
                  Priority 1 <FontAwesomeIcon icon={faFire} style={{ color: "var(--darkrose)" }} />
                </label>
              </li>
              <li>
                <label htmlFor="pri2">
                  <input
                    type="radio"
                    id="pri2"
                    name="priority"
                    value="Priority 2"
                    checked={todoData.priority === "Priority 2"}
                    onChange={handleChange}
                  />
                  Priority 2{" "}
                  <FontAwesomeIcon icon={faFireFlameCurved} style={{ color: "var(--darkpeach)" }} />
                </label>
              </li>
              <li>
                <label htmlFor="pri3">
                  <input
                    type="radio"
                    id="pri3"
                    name="priority"
                    value="Priority 3"
                    checked={todoData.priority === "Priority 3"}
                    onChange={handleChange}
                  />
                  Priority 3{" "}
                  <FontAwesomeIcon icon={faFireFlameSimple} style={{ color: "var(--darkblue)" }} />
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div className={css.tagWrapper}>
          <button
            type="button"
            className={css.listTag}
            onClick={showTagField}
            aria-label="Add list tag"
          >
            <FontAwesomeIcon icon={faTag} />
          </button>
          {tags ? (
            <select
              className={cx(css.tagPopper, !tagClosed && css.popperOpen)}
              name="tagId"
              value={todoData.tagId}
              onChange={handleChange}
            >
              {/* <input
              type="text"
              placeholder="Type a list tag"
              name="tagName"
              value={todoData.tagName}
              onChange={handleChange}
            /> */}
              <option value="">--Choose--</option>
              {tags.map((tag) => {
                return (
                  <option key={tag.id} value={parseInt(tag.id)}>
                    {tag.name}
                  </option>
                );
              })}
            </select>
          ) : null}
        </div>
        <button className={css.submitButton}>Add Todo</button>
      </div>
    </div>
  );
};

export default ExtraField;
