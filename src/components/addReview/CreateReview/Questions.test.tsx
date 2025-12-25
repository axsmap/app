import React from 'react';
import { render, screen } from '@testing-library/react';
import Questions from './Questions';
import i18n from '@/translation';
import { I18nextProvider } from 'react-i18next';

test('renders yes/no labels in Japanese', async () => {
  await i18n.changeLanguage('jp');
  render(
    <I18nextProvider i18n={i18n}>
      <Questions title="テスト" value={null} onChange={() => {}} />
    </I18nextProvider>
  );

  expect(screen.getByText('はい')).toBeTruthy();
  expect(screen.getByText('いいえ')).toBeTruthy();
});
