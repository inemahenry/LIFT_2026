USE lift_db;

-- =========================================================
-- RIDE FINANCIAL SNAPSHOT
-- Stores the pricing split used when the ride was booked.
-- This prevents later configuration changes from changing
-- an already-booked ride's financial calculation.
-- =========================================================

ALTER TABLE rides
ADD COLUMN IF NOT EXISTS driver_points INT UNSIGNED NULL AFTER price_rwf,
ADD COLUMN IF NOT EXISTS lift_share_rwf INT UNSIGNED NULL AFTER driver_points,
ADD COLUMN IF NOT EXISTS driver_share_percentage DECIMAL(5,2) NULL AFTER lift_share_rwf,
ADD COLUMN IF NOT EXISTS lift_share_percentage DECIMAL(5,2) NULL AFTER driver_share_percentage;

-- =========================================================
-- ONE PAYMENT PER RIDE
-- =========================================================

ALTER TABLE payments
ADD UNIQUE KEY IF NOT EXISTS uq_payments_ride (ride_id);

-- =========================================================
-- REWARD PAYMENTS
-- Separate from passenger ride payments.
-- =========================================================

CREATE TABLE IF NOT EXISTS reward_payments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    redemption_id BIGINT UNSIGNED NOT NULL UNIQUE,
    driver_id BIGINT UNSIGNED NOT NULL,
    amount_rwf INT UNSIGNED NOT NULL,
    provider VARCHAR(50) NOT NULL DEFAULT 'MOCK',
    provider_transaction_id VARCHAR(255) NULL UNIQUE,
    status ENUM(
        'PENDING',
        'PROCESSING',
        'COMPLETED',
        'FAILED'
    ) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_reward_payment_redemption
        FOREIGN KEY (redemption_id)
        REFERENCES reward_redemptions(id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_reward_payment_driver
        FOREIGN KEY (driver_id)
        REFERENCES drivers(id)
        ON DELETE RESTRICT,

    INDEX idx_reward_payment_driver (driver_id),
    INDEX idx_reward_payment_status (status)
);

-- =========================================================
-- ADDITIONAL CONFIGURATION
-- =========================================================

INSERT INTO business_configs
(config_key, config_value, data_type, description)
VALUES
(
    'maximum_passengers',
    '3',
    'INTEGER',
    'Maximum active passengers assigned to one driver'
)
ON DUPLICATE KEY UPDATE config_key = config_key;