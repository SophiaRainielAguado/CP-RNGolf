class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        // useful variables
        this.SHOT_VELOCITY_X_MIN = 200
        this.SHOT_VELOCITY_X_MAX = 800
        this.SHOT_VELOCITY_Y_MIN = 200
        this.SHOT_VELOCITY_Y_MAX = 1100
    }

    preload() {
        this.load.path = './assets/img/'
        this.load.image('grass', 'grass.jpg')
        this.load.image('cup', 'cup.jpg')
        this.load.image('ball', 'ball.png')
        this.load.image('wall', 'wall.png')
        this.load.image('oneway', 'one_way_wall.png')
    }

    create() {
        // add background grass
        this.grass = this.add.image(0, 0, 'grass').setOrigin(0)

        // add cup
        this.cup = this.physics.add.sprite(width / 2, height / 10, "cup")
        this.cup.body.setCircle(this.cup.width / 4)
        this.cup.body.setOffset(this.cup.width / 4)
        this.cup.body.setImmovable(true)
        
        // add ball
        this.ball = this.physics.add.sprite(width / 2, height - height / 10, "ball")
        this.ball.body.setCircle(this.ball.width / 2)
        this.ball.body.setCollideWorldBounds(true)
        this.ball.body.setBounce(0.5)
        this.ball.body.setDamping(true).setDrag(0.5)

        // add walls
        let wallOne = this.physics.add.sprite(0, height / 4, "wall")
        wallOne.setX(Phaser.Math.Between(0 + wallOne.width / 2, width - wallOne.width / 2))
        wallOne.body.setImmovable(true)

        wallOne.body.setCollideWorldBounds(true)
        wallOne.setBounce(1)            // lets wall bounce when hitting world bound
        wallOne.body.setVelocityX(200)  // moves wall

        let wallTwo = this.physics.add.sprite(0, height / 2, "wall")
        wallOne.setX(Phaser.Math.Between(0 + wallTwo.width / 2, width - wallTwo.width / 2))
        wallTwo.body.setImmovable(true) 

        this.walls = this.add.group([wallOne, wallTwo])

        // add one-way
        this.oneWay = this.physics.add.sprite(width / 2, height / 4 * 3, "oneway")
        this.oneWay.setX(Phaser.Math.Between(0 + this.oneWay.width / 2, width - this.oneWay.width / 2))
        this.oneWay.body.setImmovable(true)
        this.oneWay.body.checkCollision.down = false

        // add pointer input
        this.input.on("pointerdown", (pointer) => {
            let shotDirectionX = pointer.x <= this.ball.x ? 1 : -1
            let shotDirectionY = pointer.y <= this.ball.y ? 1 : -1
            this.ball.body.setVelocityX(Phaser.Math.Between(this.SHOT_VELOCITY_X_MIN, this.SHOT_VELOCITY_X_MIN) * shotDirectionX)
            this.ball.body.setVelocityY(Phaser.Math.Between(this.SHOT_VELOCITY_Y_MIN, this.SHOT_VELOCITY_Y_MAX) * shotDirectionY)
        })

        // cup/ball collision
        this.physics.add.collider(this.ball, this.cup, (ball, cup) => {
            this.reset()
        })

        // ball/wall collision
        this.physics.add.collider(this.ball, this.walls)

        // ball/one-way collision
        this.physics.add.collider(this.ball, this.oneWay)
    }

    update() {

    }

    reset(){
        this.ball.y = height - height / 10
    }
}

/*
CODE CHALLENGE
Try to implement at least 3/4 of the following features during the remainder of class (hint: each takes roughly 15 or fewer lines of code to implement):
[X] Add ball reset logic on successful shot
[X] Improve shot logic by making pointer’s relative x-position shoot the ball in correct x-direction
[X] Make one obstacle move left/right and bounce against screen edges
[ ] Create and display shot counter, score, and successful shot percentage
*/