document.addEventListener('DOMContentLoaded', () => {
  const $ = (id) => document.getElementById(id);

  const eventList = $('event-list');
  const groceryList = $('grocery-list');
  const taskList = $('task-list');

  const groceryInput = $('grocery-input');
  const addGroceryButton = $('add-grocery');

  const taskInput = $('task-input');
  const addTaskButton = $('add-task');

  const eventForm = $('event-form');
  const summaryInput = $('event-summary');

  const state = {
    events: [],
    groceries: [],
    tasks: []
  };

  const makeId = () =>
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  const safeParse = (key) => {
    try {
      return JSON.parse(localStorage.getItem(key) || '[]');
    } catch (error) {
      console.warn(`Failed to parse ${key} from localStorage`, error);
      return [];
    }
  };

  const hydrateEvents = (items) => {
    if (!Array.isArray(items)) return [];
    return items
      .map((item) => {
        if (!item) return null;
        if (typeof item === 'string') {
          return {
            id: makeId(),
            summary: item,
            notes: item,
            details: item
          };
        }
        return {
          id: item.id || makeId(),
          date: item.date || '',
          time: item.time || '',
          place: item.place || '',
          notes: item.notes || '',
          summary: item.summary || 'Untitled event',
          details: item.details || ''
        };
      })
      .filter(Boolean);
  };

  const hydrateListItems = (items) => {
    if (!Array.isArray(items)) return [];
    return items
      .map((item) => {
        if (!item) return null;
        if (typeof item === 'string') {
          return { id: makeId(), text: item };
        }
        const text = (item.text || '').trim();
        if (!text) return null;
        return { id: item.id || makeId(), text };
      })
      .filter(Boolean);
  };

  const persist = () => {
    localStorage.setItem('events', JSON.stringify(state.events));
    localStorage.setItem('groceries', JSON.stringify(state.groceries));
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  };

  const makeEmptyState = (message, listItem = false) => {
    const element = document.createElement(listItem ? 'li' : 'p');
    element.className = 'empty-state';
    element.textContent = message;
    return element;
  };

  const formatDate = (input) => {
    if (!input) return '';
    const parsed = new Date(input);
    if (Number.isNaN(parsed.getTime())) return '';
    return parsed.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const formatEventMeta = (event) => {
    const parts = [];
    const dateLabel = formatDate(event.date);
    if (dateLabel) parts.push(dateLabel);
    if (event.time) parts.push(event.time);
    if (event.place) parts.push(event.place);
    if (!parts.length && event.details) return event.details;
    return parts.length ? parts.join(' • ') : 'No date/time or place set';
  };

  const renderEvents = () => {
    eventList.innerHTML = '';
    if (!state.events.length) {
      eventList.appendChild(makeEmptyState('No events yet. Add one above.'));
      return;
    }

    state.events.forEach((event) => {
      const card = document.createElement('article');
      card.className = 'card';

      const header = document.createElement('div');
      header.className = 'card__header';

      const title = document.createElement('h3');
      title.className = 'card__title';
      title.textContent = event.summary || 'Untitled event';

      const badge = document.createElement('span');
      badge.className = 'badge';
      badge.textContent = 'Event';

      const completeButton = document.createElement('button');
      completeButton.className = 'btn btn--ghost';
      completeButton.textContent = 'Complete';
      completeButton.addEventListener('click', () => completeEvent(event.id));

      header.appendChild(title);
      header.appendChild(badge);
      header.appendChild(completeButton);

      const meta = document.createElement('p');
      meta.className = 'card__meta';
      meta.textContent = formatEventMeta(event);

      card.appendChild(header);
      card.appendChild(meta);

      const notesContent = event.notes?.trim() || event.details;
      if (notesContent) {
        const notes = document.createElement('p');
        notes.className = 'card__notes';
        notes.textContent = notesContent;
        card.appendChild(notes);
      }

      eventList.appendChild(card);
    });
  };

  const renderList = (items, container, emptyMessage, completeHandler) => {
    container.innerHTML = '';
    if (!items.length) {
      container.appendChild(makeEmptyState(emptyMessage, true));
      return;
    }

    items.forEach((item) => {
      const li = document.createElement('li');

      const text = document.createElement('span');
      text.className = 'list__text';
      text.textContent = item.text;

      const action = document.createElement('button');
      action.className = 'btn btn--ghost';
      action.textContent = 'Complete';
      action.addEventListener('click', () => completeHandler(item.id));

      li.appendChild(text);
      li.appendChild(action);
      container.appendChild(li);
    });
  };

  const completeEvent = (id) => {
    state.events = state.events.filter((event) => event.id !== id);
    persist();
    renderEvents();
  };

  const completeGrocery = (id) => {
    state.groceries = state.groceries.filter((item) => item.id !== id);
    persist();
    renderGroceries();
  };

  const completeTask = (id) => {
    state.tasks = state.tasks.filter((item) => item.id !== id);
    persist();
    renderTasks();
  };

  const renderGroceries = () => renderList(state.groceries, groceryList, 'Grocery list is clear.', completeGrocery);
  const renderTasks = () => renderList(state.tasks, taskList, 'No tasks yet.', completeTask);

  const addEvent = () => {
    const date = $('event-date').value;
    const time = $('event-time').value;
    const place = $('event-place').value.trim();
    const notes = $('event-notes').value.trim();
    const summary = summaryInput.value.trim();

    if (!summary) {
      summaryInput.focus();
      alert('Please add a summary for the event.');
      return;
    }

    state.events.unshift({
      id: makeId(),
      date,
      time,
      place,
      notes,
      summary,
      details: ''
    });

    persist();
    renderEvents();
    eventForm.reset();
    summaryInput.focus();
  };

  const addGrocery = () => {
    const value = groceryInput.value.trim();
    if (!value) return;
    state.groceries.unshift({ id: makeId(), text: value });
    persist();
    renderGroceries();
    groceryInput.value = '';
  };

  const addTask = () => {
    const value = taskInput.value.trim();
    if (!value) return;
    state.tasks.unshift({ id: makeId(), text: value });
    persist();
    renderTasks();
    taskInput.value = '';
  };

  const loadData = () => {
    state.events = hydrateEvents(safeParse('events'));
    state.groceries = hydrateListItems(safeParse('groceries'));
    state.tasks = hydrateListItems(safeParse('tasks'));

    renderEvents();
    renderGroceries();
    renderTasks();
  };

  eventForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addEvent();
  });

  addGroceryButton.addEventListener('click', addGrocery);
  groceryInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addGrocery();
    }
  });

  addTaskButton.addEventListener('click', addTask);
  taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTask();
    }
  });

  loadData();
});
