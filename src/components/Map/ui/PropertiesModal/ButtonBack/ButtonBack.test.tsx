import { render, fireEvent } from '@testing-library/react';
import ButtonBack from './ButtonBack';
import { MapProvider } from 'app/providers/MapProvider';
import styles from './ButtonBack.module.scss';

describe('ButtonBack', () => {
  
  it('should render the "back" button and be visible when expanded', () => {
    const { getByTestId } = render(<MapProvider><ButtonBack expanded={true} listItems={[]} /></MapProvider>);
    const button = getByTestId('ButtonForward');
    expect(button).toBeVisible();
  });

  it('should disable the "back" button if there are no list items', () => {
    const { getByTestId } = render(<MapProvider><ButtonBack expanded={true} listItems={[]} /></MapProvider>);
    const button = getByTestId('ButtonForward');
    expect(button).toHaveClass(styles.disabled);
  });

  it('should show the list on mouse enter if there are list items', () => {
    const listItems = [{ layer_type: 'Type1', properties: { uuid: 'uuid1' } }] as any;
    const { getByTestId, queryByTestId } = render(<MapProvider><ButtonBack expanded={true} listItems={listItems} /></MapProvider>);
    const button = getByTestId('ButtonForward');

    fireEvent.mouseEnter(button);
    expect(queryByTestId('PropertiesList')).toBeVisible();
  });

  it('should not show the list on mouse enter if there are no list items', () => {
    const { getByTestId, queryByTestId } = render(<MapProvider><ButtonBack expanded={true} listItems={[]} /></MapProvider>);
    const button = getByTestId('ButtonForward');

    fireEvent.mouseEnter(button);
    expect(queryByTestId('PropertiesList')).not.toBeInTheDocument();
  });

  it('should hide the list on mouse leave', () => {
    const listItems = [{ layer_type: 'Type1', properties: { uuid: 'uuid1' } }] as any;
    const { getByTestId, queryByTestId } = render(<MapProvider><ButtonBack expanded={true} listItems={listItems} /></MapProvider>);
    const button = getByTestId('ButtonForward');

    fireEvent.mouseEnter(button);
    expect(queryByTestId('PropertiesList')).toBeVisible();

    fireEvent.mouseLeave(button);
    expect(queryByTestId('PropertiesList')).not.toHaveClass(styles.visible); 
  });
});
