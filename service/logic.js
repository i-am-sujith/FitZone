const db = require('./db') //importing data bdb


//creating function for register

register = (username, name, password, age, gender, height, weight) => {
    return db.User.findOne({ username }).then(user => {
        if (user) {
            return {
                message: 'username already exist',
                status: false,
                statusCode: 404
            }
        } else {
            //    creating an object for new user in db
            newUser = new db.User({
                username: username,
                name: name,
                password: password,
                age: age,
                gender: gender,
                height: height,
                weight: weight,
                fitnesstracking: []

            })
            newUser.save()
            return {
                message: 'registered successfully',
                status: true,
                statusCode: 200
            }

        }
    })

}

login = (username, password) => {
    return db.User.findOne({ username, password }).then(user => {
        if (user) {
            return {
                message: 'login successfully',
                status: true,
                statusCode: 200,
                name: user.name,    // to display username
                currentuser: user.username, // using instead of userid
            }
        } else {
            return {
                message: 'incorrect username or password ',
                status: false,
                statusCode: 404
            }

        }
    })
}

bmi = currentuser => {
    return db.User.findOne({ username: currentuser }).then(user => {
        if (user) {
            return {
                weight: user.weight,
                height: user.height,
                age: user.age,
                message: 'success',
                status: true,
                statusCode: 200
            }
        } else {
            return {
                message: 'login first',
                status: false,
                statusCode: 404
            }
        }
    })
}


update = (height, weight, username) => {
    return db.User.findOne({ username }).then(user => {
        if (user)  {
            user.height = height,
                user.weight = weight
                user.save()

            return {
                message: 'updated successfully',
                status: true,
                statusCode: 200,
                height:user.height,
                weight:user.weight
                
              }

        }
        else {
            return {
                message: 'updated successfully',
                status: true,
                statusCode: 200
            }

        }
    })


}

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
            message: 'success weight gain',
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
            message: 'success stay fit',
            status: true,
            statusCode: 200
          };
        } else if (bmi < 29.9 && bmi >= 25) {
          user.fitnesstracking.push({
            calorieBurned: 1800,  // Updated calorie data for lose weight
            calorieIntake: 2000,  // Updated calorie data for lose weight
            workoutType: "weight loss",
            date: today,
            bmi: bmi
          });
          user.save();
          return {
            message: 'success lose weight',
            status: true,
            statusCode: 200
          };
        } else if (bmi > 29.9) {
          user.fitnesstracking.push({
            calorieBurned: 1500,  // Updated calorie data for lose weight
            calorieIntake: 1800,  // Updated calorie data for lose weight
            workoutType: "weight loss",
            date: today,
            bmi: bmi
          });
          user.save();
          return {
            message: 'success lose weight',
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
  


underweightTable= (currentuser) => {
    return db.User.findOne({username:currentuser}).then(user => {
        if (user) {
            return {
                message:user.fitnesstracking,
                status:200,
                statuscode:200
            }
        }
        else {
            return {
                message: "invalid user",
                status: false,
                statuscode: 404
            }
        }
    })
}






module.exports = {
    register, login, bmi, update ,underweight,underweightTable
}
