-- CreateTable
CREATE TABLE `Employee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `auth0sub` VARCHAR(191) NOT NULL,
    `emp_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `department` VARCHAR(191) NULL,
    `role` ENUM('ADMIN', 'EMPLOYEE') NOT NULL DEFAULT 'EMPLOYEE',
    `joiningDate` DATE NULL,

    UNIQUE INDEX `Employee_auth0sub_key`(`auth0sub`),
    UNIQUE INDEX `Employee_emp_id_key`(`emp_id`),
    UNIQUE INDEX `Employee_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeaveType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `leave_name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `default_days` INTEGER NOT NULL,
    `is_paid` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `LeaveType_leave_name_key`(`leave_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeaveRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `emp_id` INTEGER NOT NULL,
    `leave_id` INTEGER NOT NULL,
    `total_days` INTEGER NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `reason` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `manager_id` INTEGER NULL,
    `comments` VARCHAR(191) NULL,
    `actionDate` DATE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeaveBalance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `emp_id` INTEGER NOT NULL,
    `leave_id` INTEGER NOT NULL,
    `days_total` INTEGER NOT NULL,
    `days_used` INTEGER NOT NULL DEFAULT 0,
    `year` INTEGER NOT NULL,

    UNIQUE INDEX `LeaveBalance_emp_id_leave_id_year_key`(`emp_id`, `leave_id`, `year`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LeaveRequest` ADD CONSTRAINT `LeaveRequest_emp_id_fkey` FOREIGN KEY (`emp_id`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeaveRequest` ADD CONSTRAINT `LeaveRequest_leave_id_fkey` FOREIGN KEY (`leave_id`) REFERENCES `LeaveType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeaveRequest` ADD CONSTRAINT `LeaveRequest_manager_id_fkey` FOREIGN KEY (`manager_id`) REFERENCES `Employee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeaveBalance` ADD CONSTRAINT `LeaveBalance_emp_id_fkey` FOREIGN KEY (`emp_id`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeaveBalance` ADD CONSTRAINT `LeaveBalance_leave_id_fkey` FOREIGN KEY (`leave_id`) REFERENCES `LeaveType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
