//copied directly from u4few-app, nothing modified
import styled from 'styled-components';

interface Props {
  color?: string;
}

const RimView = styled.div<Props>`
  --active-size: 5fr;
  height: 100%;
  width: 100%;
  position: relative;
  display: grid;
  grid-gap: 1rem;
  grid-template-areas:
    'facts merits people'
    'thoughts . actions'
    'feelings needs topics';

  background-color: lightgray;
  color: ${props => (props.color ? props.color : 'inherit')};
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  transition: all 1s;

  /* ##### Focus styles ##### */
  > .Focus {
    align-self: center;
    justify-self: center;
  }
  &.Focus--active {
    grid-template-columns: 1fr var(--active-size) 1fr !important;
    grid-template-rows: 1fr var(--active-size) 1fr !important;
  }

  /* ##### Actions styles ##### */
  > .Actions {
    align-self: center;
    justify-self: end;
    grid-area: actions;
  }
  &.Actions--active {
    grid-template-columns: 1fr 1fr var(--active-size);
    grid-template-rows: 1fr var(--active-size) 1fr;
  }

  /* ##### People styles ##### */
  > .People {
    align-self: start;
    justify-self: end;
    grid-area: people;
  }
  &.People--active {
    grid-template-columns: 1fr 1fr var(--active-size);
    grid-template-rows: var(--active-size) 1fr 1fr;
  }

  /* ###### Merits styles ##### */
  > .Merits {
    align-self: start;
    justify-self: center;
    grid-area: merits;
  }
  &.Merits--active {
    grid-template-columns: 1fr var(--active-size) 1fr;
    grid-template-rows: var(--active-size) 1fr 1fr;
  }

  /* ##### Facts styles #####*/
  > .Facts {
    align-self: start;
    justify-self: start;
    grid-area: facts;
  }
  &.Facts--active {
    grid-template-columns: var(--active-size) 1fr 1fr;
    grid-template-rows: var(--active-size) 1fr 1fr;
  }

  /* ##### Thoughts styles ##### */
  > .Thoughts {
    align-self: center;
    justify-self: start;
    grid-area: thoughts;
  }
  &.Thoughts--active {
    grid-template-columns: var(--active-size) 1fr 1fr;
    grid-template-rows: 1fr var(--active-size) 1fr;
  }

  /* ##### Feelings active ##### */
  > .Feelings {
    align-self: end;
    justify-self: start;
    grid-area: feelings;
  }
  &.Feelings--active {
    grid-template-columns: var(--active-size) 1fr 1fr;
    grid-template-rows: 1fr 1fr var(--active-size);
  }

  /* ##### Needs styles ##### */
  > .Needs {
    align-self: end;
    justify-self: center;
    grid-area: needs;
  }
  &.Needs--active {
    grid-template-columns: 1fr var(--active-size) 1fr;
    grid-template-rows: 1fr 1fr var(--active-size);
  }

  /* ##### Topics styles ##### */
  > .Topics {
    align-self: end;
    justify-self: end;
    grid-area: topics;
  }
  &.Topics--active {
    grid-template-columns: 1fr 1fr var(--active-size);
    grid-template-rows: 1fr 1fr var(--active-size);
  }
`;

export default RimView;
