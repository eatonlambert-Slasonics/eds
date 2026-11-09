// blocks/timeline/timeline.js
export default function decorate(block) {
  const list = document.createElement('ol');

  [...block.children].forEach((row) => {
    const [dates, title, summary, tags] = [...row.children];
    const item = document.createElement('li');
    item.className = 'timeline-item';

    const dateText = dates ? dates.textContent.trim() : '';
    if (dateText.toLowerCase() === 'now') item.classList.add('timeline-now');

    const when = document.createElement('div');
    when.className = 'timeline-dates';
    when.textContent = dateText;

    const body = document.createElement('div');
    body.className = 'timeline-body';

    if (title) {
      title.className = 'timeline-title';
      body.append(title);
    }
    if (summary && summary.textContent.trim()) {
      summary.className = 'timeline-summary';
      body.append(summary);
    }
    if (tags && tags.textContent.trim()) {
      const tagList = document.createElement('ul');
      tagList.className = 'timeline-tags';
      tags.textContent.split(',')
        .map((t) => t.trim())
        .filter(Boolean)
        .forEach((t) => {
          const tag = document.createElement('li');
          tag.textContent = t;
          tagList.append(tag);
        });
      body.append(tagList);
    }

    item.append(when, body);
    list.append(item);
  });

  block.replaceChildren(list);
}
