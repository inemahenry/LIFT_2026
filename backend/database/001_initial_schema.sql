CREATE DATABASE IF NOT EXISTS lift_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE lift_db;

-- USERS
CREATE TABLE IF NOT EXISTS users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(150) NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,

    role ENUM('PASSENGER', 'DRIVER', 'ADMIN') NOT NULL DEFAULT 'PASSENGER',
    status ENUM('ACTIVE', 'SUSPENDED', 'PENDING') NOT NULL DEFAULT 'ACTIVE',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_users_role (role),
    INDEX idx_users_status (status)
);

-- BUSINESS CONFIGURATION
CREATE TABLE IF NOT EXISTS business_configs (
    config_key VARCHAR(100) PRIMARY KEY,
    config_value VARCHAR(255) NOT NULL,
    data_type ENUM('INTEGER', 'DECIMAL', 'BOOLEAN', 'STRING') NOT NULL,
    description VARCHAR(255) NULL,

    updated_by BIGINT UNSIGNED NULL,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_config_updated_by
        FOREIGN KEY (updated_by)
        REFERENCES users(id)
        ON DELETE SET NULL
);

-- DRIVERS
CREATE TABLE IF NOT EXISTS drivers (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL UNIQUE,

    verification_status ENUM(
        'PENDING',
        'APPROVED',
        'REJECTED',
        'SUSPENDED'
    ) NOT NULL DEFAULT 'PENDING',

    availability_status ENUM(
        'OFFLINE',
        'AVAILABLE',
        'BUSY'
    ) NOT NULL DEFAULT 'OFFLINE',

    points_balance INT UNSIGNED NOT NULL DEFAULT 0,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_driver_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- PASSENGERS
CREATE TABLE IF NOT EXISTS passengers (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL UNIQUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_passenger_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- VEHICLES
CREATE TABLE IF NOT EXISTS vehicles (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    driver_id BIGINT UNSIGNED NOT NULL,

    vehicle_type VARCHAR(50) NOT NULL,
    make VARCHAR(100) NULL,
    model VARCHAR(100) NULL,
    plate_number VARCHAR(30) NOT NULL UNIQUE,
    color VARCHAR(50) NULL,

    verification_status ENUM(
        'PENDING',
        'APPROVED',
        'REJECTED'
    ) NOT NULL DEFAULT 'PENDING',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_vehicle_driver
        FOREIGN KEY (driver_id)
        REFERENCES drivers(id)
        ON DELETE CASCADE
);

-- RIDES
CREATE TABLE IF NOT EXISTS rides (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    passenger_id BIGINT UNSIGNED NOT NULL,
    driver_id BIGINT UNSIGNED NULL,

    pickup_address VARCHAR(255) NOT NULL,
    destination_address VARCHAR(255) NOT NULL,

    distance_km DECIMAL(10,2) NOT NULL,
    price_rwf INT UNSIGNED NOT NULL,

    status ENUM(
        'REQUESTED',
        'ACCEPTED',
        'DRIVER_ARRIVING',
        'DRIVER_ARRIVED',
        'IN_PROGRESS',
        'COMPLETED',
        'CANCELLED'
    ) NOT NULL DEFAULT 'REQUESTED',

    requested_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    accepted_at TIMESTAMP NULL,
    started_at TIMESTAMP NULL,
    completed_at TIMESTAMP NULL,
    cancelled_at TIMESTAMP NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_ride_passenger
        FOREIGN KEY (passenger_id)
        REFERENCES passengers(id),

    CONSTRAINT fk_ride_driver
        FOREIGN KEY (driver_id)
        REFERENCES drivers(id)
        ON DELETE SET NULL,

    INDEX idx_rides_status (status),
    INDEX idx_rides_passenger (passenger_id),
    INDEX idx_rides_driver (driver_id)
);

-- PAYMENTS
CREATE TABLE IF NOT EXISTS payments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    ride_id BIGINT UNSIGNED NOT NULL,
    passenger_id BIGINT UNSIGNED NOT NULL,

    amount_rwf INT UNSIGNED NOT NULL,
    provider VARCHAR(50) NOT NULL,
    provider_transaction_id VARCHAR(150) NULL UNIQUE,

    status ENUM(
        'PENDING',
        'SUCCESS',
        'FAILED',
        'REFUNDED'
    ) NOT NULL DEFAULT 'PENDING',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_payment_ride
        FOREIGN KEY (ride_id)
        REFERENCES rides(id),

    CONSTRAINT fk_payment_passenger
        FOREIGN KEY (passenger_id)
        REFERENCES passengers(id)
);

-- POINT TRANSACTIONS
CREATE TABLE IF NOT EXISTS point_transactions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    driver_id BIGINT UNSIGNED NOT NULL,
    ride_id BIGINT UNSIGNED NULL,

    points INT NOT NULL,
    transaction_type ENUM(
        'RIDE_EARNING',
        'REWARD_REDEMPTION',
        'ADMIN_ADJUSTMENT'
    ) NOT NULL,

    description VARCHAR(255) NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_point_driver
        FOREIGN KEY (driver_id)
        REFERENCES drivers(id),

    CONSTRAINT fk_point_ride
        FOREIGN KEY (ride_id)
        REFERENCES rides(id)
        ON DELETE SET NULL
);

-- REWARD REDEMPTIONS
CREATE TABLE IF NOT EXISTS reward_redemptions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    driver_id BIGINT UNSIGNED NOT NULL,

    points_redeemed INT UNSIGNED NOT NULL,
    reward_amount_rwf INT UNSIGNED NOT NULL,

    status ENUM(
        'PENDING',
        'PROCESSING',
        'COMPLETED',
        'FAILED',
        'CANCELLED'
    ) NOT NULL DEFAULT 'PENDING',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,

    CONSTRAINT fk_reward_driver
        FOREIGN KEY (driver_id)
        REFERENCES drivers(id)
);

-- DEFAULT BUSINESS CONFIGURATION
INSERT INTO business_configs
    (config_key, config_value, data_type, description)
VALUES
    ('base_booking_fee', '500', 'INTEGER', 'Base passenger booking fee in RWF'),
    ('base_distance_km', '10', 'DECIMAL', 'Distance included in base fee'),
    ('distance_step_km', '10', 'DECIMAL', 'Additional distance pricing step'),
    ('additional_distance_charge', '50', 'INTEGER', 'Charge per additional distance step in RWF'),
    ('driver_share_percentage', '70', 'DECIMAL', 'Driver share percentage'),
    ('lift_share_percentage', '30', 'DECIMAL', 'LIFT share percentage'),
    ('minimum_reward_points', '3000', 'INTEGER', 'Minimum points required for reward'),
    ('reward_amount', '3000', 'INTEGER', 'Reward value in RWF'),
    ('reward_enabled', 'true', 'BOOLEAN', 'Whether reward withdrawals are enabled')
ON DUPLICATE KEY UPDATE
    config_key = config_key;