import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HeroCard from '../components/HeroCard';

describe('HeroCard component', () => {
  const heroProps = {
    id: 101,
    name: 'Homem-Aranha',
    thumbnail: {
      path: 'https://example.com/spiderman',
      extension: 'jpg'
    },
    description: 'Herói amigão da vizinhança'
  };

  it('renderiza nome, descrição e imagem corretamente', () => {
    render(
      <MemoryRouter>
        <HeroCard {...heroProps} />
      </MemoryRouter>
    );

    // Nome
    expect(screen.getByText('Homem-Aranha')).toBeInTheDocument();

    // Descrição
    expect(screen.getByText('Herói amigão da vizinhança')).toBeInTheDocument();

    // Imagem src
    const img = screen.getByRole('img', { name: /card-image/i });
    expect(img).toHaveAttribute('src', 'https://example.com/spiderman.jpg');
  });

  it('mostra mensagem padrão quando não tem descrição', () => {
    render(
      <MemoryRouter>
        <HeroCard
          {...heroProps}
          description="" // descrição vazia
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Não possui descrição')).toBeInTheDocument();
  });

  it('botão "Ver mais" aponta para rota correta', () => {
    render(
      <MemoryRouter>
        <HeroCard {...heroProps} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /ver mais/i });
    expect(link).toHaveAttribute('href', '/profile/101');
  });
});
