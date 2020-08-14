import React from 'react';
import { queries, render, RenderResult, buildQueries, getAllByText, QueryMethod, Matcher, MatcherOptions, RenderOptions } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';

export const renderWithRouter = (ui, { route = '/', path = route, history = createMemoryHistory({ initialEntries: [route] }) } = {}) => {
  const Wrapper = ({ children }) => (
    <Router history={history}>
      <Route path={path}>{children}</Route>
    </Router>
  );
  return {
    ...customRender(ui, { wrapper: Wrapper }),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history
  };
};

/////////////////////// GET TEXTFIELD INPUT ///////////////////////

const queryAllTextfieldInputsByLabelMultipleError = (container: HTMLElement, label: string) => `Found multiple textfield inputs with the label of: ${label}`;
const queryAllTextfieldInputsByLabelMissingError = (container: HTMLElement, label: string) => `Unable to find a textfield input with the label: ${label}`;

const queryAllTextfieldInputsByLabel: QueryMethod<[Matcher, MatcherOptions], HTMLElement[]> = (
  container: HTMLElement,
  label: Matcher,
  options: MatcherOptions
): HTMLElement[] => {
  try {
    const labelElements = getAllByText(container, label, options);
    return labelElements.map((x) => x.nextElementSibling.children[0]) as HTMLElement[];
  } catch (err) {
    return [];
  }
};

const [
  queryTextfieldInputByLabel,
  getAllTextfieldInputsByLabel,
  getTextfieldInputByLabel,
  findAllTextfieldInputsByLabel,
  findTextfieldInputByLabel
] = buildQueries(queryAllTextfieldInputsByLabel, queryAllTextfieldInputsByLabelMultipleError, queryAllTextfieldInputsByLabelMissingError);

/////////////////////// GET TEXTFIELD HELPER TEXT ///////////////////////

const queryAllTextfieldHelperTextByLabelMultipleError = (container: HTMLElement, label: string) => `Found multiple textfield with the label of: ${label}`;
const queryAllTextfieldHelperTextByLabelMissingError = (container: HTMLElement, label: string) => `Unable to find a textfield with the label: ${label}`;

const queryAllTextfieldHelperTextByLabel: QueryMethod<[Matcher, MatcherOptions], HTMLElement[]> = (
  container: HTMLElement,
  label: Matcher,
  options: MatcherOptions
): HTMLElement[] => {
  try {
    const labelElements = getAllByText(container, label, options);
    return labelElements.map((x) => x.nextElementSibling.nextElementSibling) as HTMLElement[];
  } catch (err) {
    return [];
  }
};

const [
  queryTextfieldHelperTextByLabel,
  getAllTextfieldHelperTextByLabel,
  getTextfieldHelperTextByLabel,
  findAllTextfieldHelperTextByLabel,
  findTextfieldHelperTextByLabel
] = buildQueries(queryAllTextfieldHelperTextByLabel, queryAllTextfieldHelperTextByLabelMultipleError, queryAllTextfieldHelperTextByLabelMissingError);

/////////////////////// ALL CUSTOM QUERIES ///////////////////////

export const customQueries = {
  queryTextfieldInputByLabel,
  queryAllTextfieldInputsByLabel,
  getAllTextfieldInputsByLabel,
  getTextfieldInputByLabel,
  findAllTextfieldInputsByLabel,
  findTextfieldInputByLabel,
  queryTextfieldHelperTextByLabel,
  getAllTextfieldHelperTextByLabel,
  getTextfieldHelperTextByLabel,
  findAllTextfieldHelperTextByLabel,
  findTextfieldHelperTextByLabel
};

/////////////////////// EXPORTS ///////////////////////

const allQueries = { ...queries, ...customQueries };
type CustomRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'queries'>) => RenderResult<typeof allQueries>;
const customRender: CustomRender = (ui, options) => render(ui, { queries: allQueries, ...options });

export * from '@testing-library/react';
export { customRender as render };
