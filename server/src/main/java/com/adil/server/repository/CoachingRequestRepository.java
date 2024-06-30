package com.adil.server.repository;

import com.adil.server.entity.CoachingRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoachingRequestRepository extends JpaRepository<CoachingRequest, Long> {
}
