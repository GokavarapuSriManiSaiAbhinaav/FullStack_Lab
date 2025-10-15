package com.fit.fitlog.service;

import com.fit.fitlog.entity.FitLog;
import com.fit.fitlog.repository.FitLogRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FitLogService {
    private final FitLogRepository repo;

    public FitLogService(FitLogRepository repo) {
        this.repo = repo;
    }

    public FitLog save(FitLog f) {
        return repo.save(f);
    }

    public List<FitLog> findAll() {
        return repo.findAll();
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

}
