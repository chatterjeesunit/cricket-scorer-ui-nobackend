import PlayerStatus from './gameConstants';

export const initialState = {
    maxOvers: 20,
    team1: {
      name : 'India',
      totalRun : 0,
      totalWickets : 0,
      totalBalls : 0,
      isBatting : true,
      players : [
        {
          name : 'Rohit Sharma',
          runsScored : 0,
          numberOfSixes : 0,
          numberOfFours : 0,
          ballsFaced : 0,
          runsGiven : 0,
          wicketsTaken : 0,
          ballsBowled : 0,
          numberOfMaidens : 0,
          status : PlayerStatus.STRIKER
        },
        {
          name : 'Shikhar Dhawan',
          runsScored : 0,
          numberOfSixes : 0,
          numberOfFours : 0,
          ballsFaced : 0,
          runsGiven : 0,
          wicketsTaken : 0,
          ballsBowled : 0,
          numberOfMaidens : 0,
          status : PlayerStatus.NON_STRIKER
        },
        {
          name : 'Virat Kohli',
          runsScored : 0,
          numberOfSixes : 0,
          numberOfFours : 0,
          ballsFaced : 0,
          runsGiven : 0,
          wicketsTaken : 0,
          ballsBowled : 0,
          numberOfMaidens : 0,
          status : PlayerStatus.YET_TO_PLAY
        },
        {
          name : 'M S Dhoni',
          runsScored : 0,
          numberOfSixes : 0,
          numberOfFours : 0,
          ballsFaced : 0,
          runsGiven : 0,
          wicketsTaken : 0,
          ballsBowled : 0,
          numberOfMaidens : 0,
          status : PlayerStatus.YET_TO_PLAY
        },
        {
          name : 'Kedar Jadhav',
          runsScored : 0,
          numberOfSixes : 0,
          numberOfFours : 0,
          ballsFaced : 0,
          runsGiven : 0,
          wicketsTaken : 0,
          ballsBowled : 0,
          numberOfMaidens : 0,
          status : PlayerStatus.YET_TO_PLAY
        },
        {
          name : 'Rishabh Pant',
          runsScored : 0,
          numberOfSixes : 0,
          numberOfFours : 0,
          ballsFaced : 0,
          runsGiven : 0,
          wicketsTaken : 0,
          ballsBowled : 0,
          numberOfMaidens : 0,
          status : PlayerStatus.YET_TO_PLAY
        },
        {
          name : 'Hardik Pandya',
          runsScored : 0,
          numberOfSixes : 0,
          numberOfFours : 0,
          ballsFaced : 0,
          runsGiven : 0,
          wicketsTaken : 0,
          ballsBowled : 0,
          numberOfMaidens : 0,
          status : PlayerStatus.YET_TO_PLAY
        },
        {
          name : 'Bhuvneshwar Kumar',
          runsScored : 0,
          numberOfSixes : 0,
          numberOfFours : 0,
          ballsFaced : 0,
          runsGiven : 0,
          wicketsTaken : 0,
          ballsBowled : 0,
          numberOfMaidens : 0,
          status : PlayerStatus.YET_TO_PLAY
        },
        {
          name : 'Jasprit Bumrah',
          runsScored : 0,
          numberOfSixes : 0,
          numberOfFours : 0,
          ballsFaced : 0,
          runsGiven : 0,
          wicketsTaken : 0,
          ballsBowled : 0,
          numberOfMaidens : 0,
          status : PlayerStatus.YET_TO_PLAY
        },
        {
          name : 'Kuldeep Yadav',
          runsScored : 0,
          numberOfSixes : 0,
          numberOfFours : 0,
          ballsFaced : 0,
          runsGiven : 0,
          wicketsTaken : 0,
          ballsBowled : 0,
          numberOfMaidens : 0,
          status : PlayerStatus.YET_TO_PLAY
        },
        {
          name : 'Y Chahal',
          runsScored : 0,
          numberOfSixes : 0,
          numberOfFours : 0,
          ballsFaced : 0,
          runsGiven : 0,
          wicketsTaken : 0,
          ballsBowled : 0,
          numberOfMaidens : 0,
          status : PlayerStatus.YET_TO_PLAY
        }
      ]
    },
    team2: {
      name : 'Afghanistan',
      totalRun : 0,
      totalWickets : 0,
      totalBalls : 0,
      isBatting : false,
      players : [
        {
          name : 'Asghar Afghan',
          runsScored : 0,
          numberOfSixes : 0,
          numberOfFours : 0,
          ballsFaced : 0,
          runsGiven : 0,
          wicketsTaken : 0,
          ballsBowled : 0,
          numberOfMaidens : 0,
          status : PlayerStatus.BOWLING
        },
        {
          name : 'Ihsanullah Janat',
          runsScored : 0,
          numberOfSixes : 0,
          numberOfFours : 0,
          ballsFaced : 0,
          runsGiven : 0,
          wicketsTaken : 0,
          ballsBowled : 0,
          numberOfMaidens : 0,
          status : PlayerStatus.YET_TO_PLAY
        },
        {
          name : 'Hashmatullah Shahidi',
          runsScored : 0,
          numberOfSixes : 0,
          numberOfFours : 0,
          ballsFaced : 0,
          runsGiven : 0,
          wicketsTaken : 0,
          ballsBowled : 0,
          numberOfMaidens : 0,
          status : PlayerStatus.YET_TO_PLAY
        },
        {
          name : 'Mohammad Shahzad',
          runsScored : 0,
          numberOfSixes : 0,
          numberOfFours : 0,
          ballsFaced : 0,
          runsGiven : 0,
          wicketsTaken : 0,
          ballsBowled : 0,
          numberOfMaidens : 0,
          status : PlayerStatus.YET_TO_PLAY
        },
        {
          name : 'Rahmat Shah',
          runsScored : 0,
          numberOfSixes : 0,
          numberOfFours : 0,
          ballsFaced : 0,
          runsGiven : 0,
          wicketsTaken : 0,
          ballsBowled : 0,
          numberOfMaidens : 0,
          status : PlayerStatus.YET_TO_PLAY
        },
        {
          name : 'Mohammad Nabi',
          runsScored : 0,
          numberOfSixes : 0,
          numberOfFours : 0,
          ballsFaced : 0,
          runsGiven : 0,
          wicketsTaken : 0,
          ballsBowled : 0,
          numberOfMaidens : 0,
          status : PlayerStatus.YET_TO_PLAY
        },
        {
          name : 'Samiullah Shenwari',
          runsScored : 0,
          numberOfSixes : 0,
          numberOfFours : 0,
          ballsFaced : 0,
          runsGiven : 0,
          wicketsTaken : 0,
          ballsBowled : 0,
          numberOfMaidens : 0,
          status : PlayerStatus.YET_TO_PLAY
        },
        {
          name : 'Gulbadin Naib',
          runsScored : 0,
          numberOfSixes : 0,
          numberOfFours : 0,
          ballsFaced : 0,
          runsGiven : 0,
          wicketsTaken : 0,
          ballsBowled : 0,
          numberOfMaidens : 0,
          status : PlayerStatus.YET_TO_PLAY
        },
        {
          name : 'Rashid Khan',
          runsScored : 0,
          numberOfSixes : 0,
          numberOfFours : 0,
          ballsFaced : 0,
          runsGiven : 0,
          wicketsTaken : 0,
          ballsBowled : 0,
          numberOfMaidens : 0,
          status : PlayerStatus.YET_TO_PLAY
        },
        {
          name : 'Mujeeb Ur Rahman',
          runsScored : 0,
          numberOfSixes : 0,
          numberOfFours : 0,
          ballsFaced : 0,
          runsGiven : 0,
          wicketsTaken : 0,
          ballsBowled : 0,
          numberOfMaidens : 0,
          status : PlayerStatus.YET_TO_PLAY
        },
        {
          name : 'Wafadar Momand',
          runsScored : 0,
          numberOfSixes : 0,
          numberOfFours : 0,
          ballsFaced : 0,
          runsGiven : 0,
          wicketsTaken : 0,
          ballsBowled : 0,
          numberOfMaidens : 0,
          status : PlayerStatus.YET_TO_PLAY
        }
      ]
    }
  };

  