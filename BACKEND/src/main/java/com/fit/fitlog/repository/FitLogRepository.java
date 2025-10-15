package com.fit.fitlog.repository;

import com.fit.fitlog.entity.FitLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FitLogRepository extends JpaRepository<FitLog, Long> {
}
