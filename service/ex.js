underweight = (currentuser, bmi, today) => {
    return db.User.findOne({ username: currentuser }).then(user => {
      if (user) {
        if (bmi < 18.5) {
          user.fitnesstracking.push({
            calorieBurned: 2500,  // Updated calorie data for weight gain
            calorieIntake: 3500,  // Updated calorie data for weight gain
            workoutType: "weight gain",
            date: today,
            bmi: bmi
          });
          user.save();
          return {
            message: 'success',
            status: true,
            statusCode: 200
          };
        } else if (bmi < 25 && bmi > 18.5) {
          user.fitnesstracking.push({
            calorieBurned: 2000,  // Updated calorie data for stay fit
            calorieIntake: 2500,  // Updated calorie data for stay fit
            workoutType: "stay fit",
            date: today,
            bmi: bmi
          });
          user.save();
          return {
            message: 'success',
            status: true,
            statusCode: 200
          };
        } else if (bmi < 29.9 && bmi >= 25) {
          user.fitnesstracking.push({
            calorieBurned: 1800,  // Updated calorie data for lose weight
            calorieIntake: 2000,  // Updated calorie data for lose weight
            workoutType: "lose weight",
            date: today,
            bmi: bmi
          });
          user.save();
          return {
            message: 'success',
            status: true,
            statusCode: 200
          };
        } else if (bmi > 29.9) {
          user.fitnesstracking.push({
            calorieBurned: 1500,  // Updated calorie data for lose weight
            calorieIntake: 1800,  // Updated calorie data for lose weight
            workoutType: "lose weight",
            date: today,
            bmi: bmi
          });
          user.save();
          return {
            message: 'success',
            status: true,
            statusCode: 200
          };
        }
      } else {
        return {
          message: 'login first',
          status: false,
          statusCode: 404
        };
      }
    });
  };
  