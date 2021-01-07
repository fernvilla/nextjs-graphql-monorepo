import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  const nba = await prisma.league.create({
    data: {
      name: 'National Baseketball Association',
      shortName: 'NBA',
      slug: 'national-basketball-association'
    }
  });

  const mlb = await prisma.league.create({
    data: {
      name: 'Major League Baseball',
      shortName: 'MLB',
      slug: 'major-league-baseball'
    }
  });

  const lakers = await prisma.team.create({
    data: {
      name: 'Los Angeles Lakers',
      shortName: 'Lakers',
      slug: 'los-angeles-lakers',
      league: {
        connect: {
          id: nba.id
        }
      }
    }
  });

  const dodgers = await prisma.team.create({
    data: {
      name: 'Los Angeles Dodgers',
      shortName: 'Dodgers',
      slug: 'los-angeles-dodgers',
      league: {
        connect: {
          id: mlb.id
        }
      }
    }
  });

  await prisma.twitterAccount.create({
    data: {
      accountName: 'Lakers',
      team: {
        connect: {
          id: lakers.id
        }
      }
    }
  });

  await prisma.twitterAccount.create({
    data: {
      accountName: 'Dodgers',
      team: {
        connect: {
          id: dodgers.id
        }
      }
    }
  });

  console.log('Successfully seeded db');
};

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
