import React from 'react';
import { connect } from 'react-redux';
import { selectAll } from '../actions/todosActions';
import { setFilter } from '../actions/filterActions';

const mapStateToProps = (state) => ({ filter: state.filter });

function TasksInfo({ filter, selectAll, setFilter, activeTodoCount }) {
  return (
    <div className="tasks-info">
      <div className="select-all">
        <input
          type="checkbox"
          id="select-all"
          onChange={(event) => selectAll(event)}
          checked={activeTodoCount === 0}
        />
        <label htmlFor="select-all">Select All</label>
      </div>
      <div>
        <b>{activeTodoCount}</b> tasks left
      </div>
      <ul className="filters">
        <li
          className={'filter-elem' + (filter === 'all' ? ' selected' : '')}
          onClick={() => setFilter('all')}
        >
          All
        </li>
        <li
          className={'filter-elem' + (filter === 'active' ? ' selected' : '')}
          onClick={() => setFilter('active')}
        >
          Active
        </li>
        <li
          className={'filter-elem' + (filter === 'completed' ? ' selected' : '')}
          onClick={() => setFilter('completed')}
        >
          Completed
        </li>
      </ul>
    </div>
  );
}

export default connect(mapStateToProps, { selectAll, setFilter })(TasksInfo);
