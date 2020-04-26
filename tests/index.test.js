import { render } from '@testing-library/react';
import { app } from '../src';

describe('when the app starts', () => {
  let rendered;

  beforeEach(() => {
    rendered = render(app);
  });

  it('displays the title', () => {
    rendered.getByText('Shorts or Pants');
  });
});
